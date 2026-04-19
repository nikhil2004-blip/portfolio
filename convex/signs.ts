import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("signs").collect();
  },
});

export const add = mutation({
  args: {
    uid: v.string(),
    name: v.string(),
    message: v.string(),
    position: v.array(v.number()),
    rotationY: v.number(),
    placedAt: v.string(),
  },
  handler: async (ctx, args) => {
    // SECURITY: Prevent spam by limiting signs per UID (max 2)
    const existing = await ctx.db
      .query("signs")
      .withIndex("by_uid", (q) => q.eq("uid", args.uid))
      .collect();
    
    if (existing.length >= 2) {
      throw new Error("Maximum sign limit reached (2 per visitor)");
    }

    // SECURITY: Validate message length
    if (args.message.length > 300) {
      throw new Error("Message too long (max 300 characters)");
    }
    if (args.name.length > 50) {
      throw new Error("Name too long (max 50 characters)");
    }

    const signId = await ctx.db.insert("signs", {
      uid: args.uid,
      name: args.name,
      message: args.message,
      position: args.position,
      rotationY: args.rotationY,
      placedAt: args.placedAt,
    });
    return signId;
  },
});

export const update = mutation({
  args: {
    id: v.id("signs"),
    uid: v.string(), // Client must provide their UID
    name: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, uid, ...updates } = args;
    
    // SECURITY: Verify ownership before patching
    const existing = await ctx.db.get(id);
    if (!existing || existing.uid !== uid) {
      throw new Error("Unauthorized: You do not own this sign");
    }

    // SECURITY: Validate lengths
    if (updates.message && updates.message.length > 300) throw new Error("Message too long");
    if (updates.name && updates.name.length > 50) throw new Error("Name too long");

    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { 
    id: v.id("signs"),
    uid: v.string() // Client must provide their UID
  },
  handler: async (ctx, args) => {
    // SECURITY: Verify ownership before deleting
    const existing = await ctx.db.get(args.id);
    if (!existing || existing.uid !== args.uid) {
      throw new Error("Unauthorized: You do not own this sign");
    }

    await ctx.db.delete(args.id);
  },
});
