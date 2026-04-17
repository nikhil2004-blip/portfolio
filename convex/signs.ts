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
    name: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("signs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
