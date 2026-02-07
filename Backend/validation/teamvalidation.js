const z=require("zod");

const createTeamSchema=z.object({
    name:z.string().min(1,"Team name is required")
});
module.exports=createTeamSchema;