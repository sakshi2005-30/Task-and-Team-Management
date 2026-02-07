const z=require("zod");

const createTaskSchema=z.object({
    title:z.string().min(1,"Task title is requried"),
    status:z.enum(["todo","in-progress","done"]),
    priority:z.enum(["low","medium","high"])
})
module.exports=createTaskSchema