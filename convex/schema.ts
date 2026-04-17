import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  signs: defineTable({
    uid: v.string(), // Visitor ID to track who owns it
    name: v.string(),
    message: v.string(),
    position: v.array(v.number()), // [x, y, z]
    rotationY: v.number(),
    placedAt: v.string(),
  }),
});
