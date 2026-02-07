const z=require("zod");

const createProjectSchema=z.object({
    name:z.string().min(1,"Project  name is required"),
    description:z.string().optional()
})
module.exports=createProjectSchema