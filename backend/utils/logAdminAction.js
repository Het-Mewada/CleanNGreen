import AdminLog from "../models/AdminLogs.js";

const logAdminAction = async ({ action, performedBy }) => {
  try {
    const log = new AdminLog({ action, performedBy });
    await log.save();
  } catch (err) {
    console.error("Failed to log admin action:", err);
  }
};

export default logAdminAction;