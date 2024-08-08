const { creatRoleService } = require("../service/AuthService");



const createRole = async(req, res) => {
  try {
    const {roleName}= req.body;
    const newRole = await creatRoleService(roleName);
    if (newRole) {
        return res.json({
            status: "success",
            message: "role created successfully",
            data: newRole
        });
    }else{
        throw new Error("error creating new role");
    }
  } catch (error) {
    return res.status(500).json({
        statusCode: 500,
        status: "error",
        message: `Error creating role: ${error.message}`,
      });
  }
}

module.exports = {createRole};
