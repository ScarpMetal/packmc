import { give } from "../../../../utils/commands";

// Give one diamond block to the executing player
console.log("hi");
give("@s", "diamond_block", 1);

for (let i = 0; i < 10; i++) {
  give("@s", "diamond_block", 1);
}
