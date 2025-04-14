import Project from "../models/ProjectModel.js";
// Get all projects
 const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get one project by id to edit
const getEditProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new project (admin only)
 const createProject = async (req, res) => {
    const data = req.body;
  try {
    const project = new Project(req.body);
    project.save()
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a project (admin only)
 const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Delete a Project (admin Only)
const deleteProject = async(req,res) =>{
  const projectId = req.params.id;

  try {
    const deleted = await Project.findByIdAndDelete(projectId);
    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default {getProjects,createProject,updateProject,getEditProject,deleteProject}