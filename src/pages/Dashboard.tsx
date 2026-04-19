import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  Clock, 
  Layout, 
  Plus, 
  Search, 
  Settings, 
  User as UserIcon, 
  Edit2, 
  Trash2, 
  MoreVertical,
  ChevronRight,
  Bell,
  Eye,
  CheckCircle2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";

interface Project {
  id: string;
  name: string;
  status: "In Progress" | "Review" | "Completed";
  progress: number;
  type: string;
  description: string;
}

export default function Dashboard() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"projects" | "profile" | "settings">("projects");
  
  // Project State
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({ name: "", type: "", description: "" });

  // Profile Form State
  const [profileName, setProfileName] = useState(user?.name || "");
  const [profileEmail, setProfileEmail] = useState(user?.email || "");

  // Settings State
  const [settings, setSettings] = useState({
    emailNotifications: true,
    aiOptimizations: true,
    autoDeploy: false
  });

  useEffect(() => {
    const savedProjects = localStorage.getItem("clickors_projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      const initialProjects: Project[] = [
        { id: "1", name: "Solaris Brand Rebuild", status: "In Progress", progress: 65, type: "Web Design", description: "Complete visual identity and website reconstruction for Solaris Energy." },
        { id: "2", name: "Arcline SaaS Platform", status: "Review", progress: 90, type: "App UI/UX", description: "Design and prototyping of the core Arcline growth platform." },
        { id: "3", name: "Helix Brand Assets", status: "Completed", progress: 100, type: "Visual ID", description: "Development of comprehensive brand guidelines and digital assets." },
      ];
      setProjects(initialProjects);
      localStorage.setItem("clickors_projects", JSON.stringify(initialProjects));
    }
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem("clickors_projects", JSON.stringify(updatedProjects));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProject.name,
      type: newProject.type,
      description: newProject.description,
      status: "In Progress",
      progress: 0
    };
    saveProjects([...projects, project]);
    setNewProject({ name: "", type: "", description: "" });
    setIsAddProjectOpen(false);
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const updated = projects.map(p => p.id === editingProject.id ? editingProject : p);
    saveProjects(updated);
    setIsEditProjectOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileName, profileEmail);
  };

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-8 lg:px-16 pb-20 font-body antialiased">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header & Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="liquid-glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-white/50 w-fit">
              Premium Agency Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-heading italic text-white leading-none">
              Control Center
            </h1>
            <div className="flex items-center gap-1 liquid-glass rounded-full px-1 py-1 w-fit">
               <button 
                onClick={() => setActiveTab("projects")}
                className={`px-6 py-2 rounded-full text-xs font-medium transition-all ${activeTab === "projects" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
               >
                 Projects
               </button>
               <button 
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-2 rounded-full text-xs font-medium transition-all ${activeTab === "profile" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
               >
                 Profile
               </button>
               <button 
                onClick={() => setActiveTab("settings")}
                className={`px-6 py-2 rounded-full text-xs font-medium transition-all ${activeTab === "settings" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
               >
                 Settings
               </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-3 liquid-glass rounded-full pl-4 pr-1 py-1">
                <Search className="w-4 h-4 text-white/30" />
                <input 
                  placeholder="Search project..." 
                  className="bg-transparent border-none text-xs text-white focus:outline-none placeholder:text-white/20 w-40"
                />
                <div className="bg-white/5 rounded-full px-3 py-1.5 text-[10px] text-white/30 tracking-tight">
                  ⌘K
                </div>
             </div>
             <button onClick={logout} className="liquid-glass rounded-full px-5 py-2.5 text-xs font-medium text-white/60 hover:text-white transition-colors">
               Sign Out
             </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="liquid-glass rounded-3xl p-8 space-y-4 group hover:bg-white/[0.03] transition-colors">
                    <div className="flex items-center justify-between">
                      <BarChart3 className="w-6 h-6 text-white/40 group-hover:text-white/80 transition-colors" />
                      <span className="text-emerald-400 text-xs font-medium">+12% vs last month</span>
                    </div>
                    <div>
                      <div className="text-4xl font-heading italic text-white">{projects.length < 10 ? `0${projects.length}` : projects.length}</div>
                      <div className="text-white/40 text-sm">Active Projects</div>
                    </div>
                 </div>
                 <div className="liquid-glass rounded-3xl p-8 space-y-4 group hover:bg-white/[0.03] transition-colors">
                    <div className="flex items-center justify-between">
                      <Clock className="w-6 h-6 text-white/40 group-hover:text-white/80 transition-colors" />
                      <span className="text-white/40 text-xs">Averaging Delivery</span>
                    </div>
                    <div>
                      <div className="text-4xl font-heading italic text-white">05 Days</div>
                      <div className="text-white/40 text-sm">Industry-leading speed</div>
                    </div>
                 </div>
                 <div className="liquid-glass rounded-3xl p-8 space-y-4 group hover:bg-white/[0.03] transition-colors">
                    <div className="flex items-center justify-between">
                      <Layout className="w-6 h-6 text-white/40 group-hover:text-white/80 transition-colors" />
                      <span className="text-white/40 text-xs">Project Completion</span>
                    </div>
                    <div>
                       <div className="text-4xl font-heading italic text-white">
                         {Math.round(projects.filter(p => p.status === "Completed").length / (projects.length || 1) * 100)}%
                       </div>
                       <div className="text-white/40 text-sm">Overall Portfolio</div>
                    </div>
                 </div>
              </div>

              {/* Projects Table */}
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-heading italic text-white">Project Briefs</h2>
                    <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
                      <DialogTrigger asChild>
                        <button className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-sm text-white hover:scale-105 transition-transform">
                          <Plus className="w-4 h-4" />
                          New Project
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-neutral-950 border border-white/10 rounded-[2.5rem] p-10 font-body text-white max-w-xl">
                        <DialogHeader>
                          <DialogTitle className="text-3xl font-heading italic text-white mb-2">Initialize New Brief</DialogTitle>
                          <p className="text-white/40 text-sm">Fill in the details for your next world-class project.</p>
                        </DialogHeader>
                        <form onSubmit={handleAddProject} className="space-y-6 mt-8">
                          <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-widest text-white/40 ml-4">Project Name</Label>
                            <Input 
                              required
                              value={newProject.name}
                              onChange={e => setNewProject({...newProject, name: e.target.value})}
                              placeholder="e.g. Luminary Brand Rebuild" 
                              className="bg-white/5 border-white/10 rounded-full py-6 px-6 focus:border-white/20 transition-colors placeholder:text-white/10" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-widest text-white/40 ml-4">Category / Type</Label>
                            <Input 
                              required
                              value={newProject.type}
                              onChange={e => setNewProject({...newProject, type: e.target.value})}
                              placeholder="e.g. Web Design & AI Implementation" 
                              className="bg-white/5 border-white/10 rounded-full py-6 px-6 focus:border-white/20 transition-colors placeholder:text-white/10" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-widest text-white/40 ml-4">Description</Label>
                            <Textarea 
                              required
                              value={newProject.description}
                              onChange={e => setNewProject({...newProject, description: e.target.value})}
                              placeholder="Describe the vision..." 
                              className="bg-white/5 border-white/10 rounded-[1.5rem] py-4 px-6 focus:border-white/20 transition-colors min-h-[120px] placeholder:text-white/10" 
                            />
                          </div>
                          <DialogFooter className="pt-4">
                            <Button type="submit" className="liquid-glass-strong w-full rounded-full py-6 text-white hover:scale-[1.02] transition-transform">
                              Create Project
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                 </div>

                 <div className="liquid-glass rounded-[2rem] overflow-hidden">
                    <div className="hidden md:grid grid-cols-5 px-8 py-5 bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/30">
                      <div>Project Name</div>
                      <div>Type</div>
                      <div>Status</div>
                      <div>Success Rate</div>
                      <div className="text-right pr-4">Actions</div>
                    </div>
                    <div className="divide-y divide-white/5">
                      {projects.map((project, i) => (
                        <div 
                          key={project.id}
                          className="grid grid-cols-1 md:grid-cols-5 items-center px-8 py-6 hover:bg-white/5 transition-colors group cursor-default"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
                            <div className="text-white font-medium">{project.name}</div>
                          </div>
                          <div className="text-white/40 text-sm hidden md:block">{project.type}</div>
                          <div>
                             <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                               project.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" :
                               project.status === "Review" ? "bg-amber-500/10 text-amber-400" :
                               "bg-blue-500/10 text-blue-400"
                             }`}>
                               {project.status}
                             </span>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden max-w-[120px]">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${project.progress}%` }}
                                  className={`h-full ${project.status === "Completed" ? "bg-emerald-400" : "bg-white opacity-80"}`}
                                />
                             </div>
                             <span className="text-white/40 text-[10px]">{project.progress}%</span>
                          </div>
                          <div className="flex items-center justify-end gap-2">
                             <button 
                               onClick={() => {
                                 setSelectedProject(project);
                                 setIsDetailsOpen(true);
                               }}
                               className="liquid-glass rounded-full p-2 text-white/40 hover:text-white transition-colors"
                             >
                               <Eye className="w-4 h-4" />
                             </button>
                             <button 
                               onClick={() => {
                                 setEditingProject(project);
                                 setIsEditProjectOpen(true);
                               }}
                               className="liquid-glass rounded-full p-2 text-white/40 hover:text-white transition-colors"
                             >
                               <Edit2 className="w-4 h-4" />
                             </button>
                             <button 
                               onClick={() => handleDeleteProject(project.id)}
                               className="liquid-glass rounded-full p-2 text-white/40 hover:text-red-400 transition-colors"
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-2xl mx-auto"
            >
              <div className="liquid-glass rounded-[2.5rem] p-12 space-y-10">
                <div className="flex items-center gap-8">
                   <div className="relative group">
                     <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center liquid-glass overflow-hidden border border-white/10">
                        {/* Mock Avatar */}
                        <UserIcon className="w-10 h-10 text-white/20" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                           <p className="text-[10px] font-medium uppercase text-white">Change</p>
                        </div>
                     </div>
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-2xl font-heading italic text-white">{user?.name}</h3>
                      <p className="text-white/40 text-xs tracking-wider">Premium Member since 2026</p>
                   </div>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">Display Name</Label>
                        <Input 
                          value={profileName}
                          onChange={e => setProfileName(e.target.value)}
                          className="bg-white/5 border-white/10 rounded-full py-6 px-6 focus:border-white/20" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">Email Address</Label>
                        <Input 
                          value={profileEmail}
                          onChange={e => setProfileEmail(e.target.value)}
                          className="bg-white/5 border-white/10 rounded-full py-6 px-6 focus:border-white/20" 
                        />
                      </div>
                   </div>
                   <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">Bio / Professional Title</Label>
                        <Input 
                          placeholder="Lead Design Strategist"
                          className="bg-white/5 border-white/10 rounded-full py-6 px-6 focus:border-white/20" 
                        />
                   </div>
                   <button 
                    type="submit" 
                    className="liquid-glass-strong rounded-full px-8 py-3 text-sm text-white hover:scale-105 transition-transform"
                   >
                     Save Profile Changes
                   </button>
                </form>

                <div className="pt-8 border-t border-white/5 flex items-center gap-4 text-xs">
                   <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                   <p className="text-white/40">Verified Industry Professional</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="liquid-glass rounded-[2.5rem] p-12 space-y-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-heading italic text-white">System Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 liquid-glass rounded-2xl">
                       <div className="space-y-1">
                          <p className="text-white font-medium text-sm">Email Notifications</p>
                          <p className="text-white/30 text-xs">Receive weekly summary and success alerts.</p>
                       </div>
                       <Switch 
                        checked={settings.emailNotifications} 
                        onCheckedChange={(v) => setSettings({...settings, emailNotifications: v})}
                       />
                    </div>
                    <div className="flex items-center justify-between p-6 liquid-glass rounded-2xl">
                       <div className="space-y-1">
                          <p className="text-white font-medium text-sm">AI Engine Optimizations</p>
                          <p className="text-white/30 text-xs">Allow autonomous site-evolution tracking.</p>
                       </div>
                       <Switch 
                        checked={settings.aiOptimizations} 
                        onCheckedChange={(v) => setSettings({...settings, aiOptimizations: v})}
                       />
                    </div>
                    <div className="flex items-center justify-between p-6 liquid-glass rounded-2xl">
                       <div className="space-y-1">
                          <p className="text-white font-medium text-sm">Auto-Deployment</p>
                          <p className="text-white/30 text-xs">Instantly ship updates to staging servers.</p>
                       </div>
                       <Switch 
                        checked={settings.autoDeploy} 
                        onCheckedChange={(v) => setSettings({...settings, autoDeploy: v})}
                       />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-heading italic text-white">Security & API</h3>
                  <div className="p-8 liquid-glass rounded-3xl space-y-6">
                     <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-white/40 ml-4">API Access Key</Label>
                        <div className="relative">
                           <Input 
                            readOnly
                            value="ck_live_678239450hskldjf_9234"
                            className="bg-white/5 border-white/10 rounded-full py-6 pr-24"
                           />
                           <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-white hover:text-white/60">
                             Copy Key
                           </button>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-between items-center text-xs">
                   <p className="text-white/20 italic">Studio Version 2.0.4 Platinum</p>
                   <button className="text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest text-[10px] font-medium">Deactivate Account</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={isEditProjectOpen} onOpenChange={setIsEditProjectOpen}>
        <DialogContent className="bg-neutral-950 border border-white/10 rounded-[2.5rem] p-10 font-body text-white max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-heading italic text-white mb-2">Refine Brief</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProject} className="space-y-6 mt-8">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-white/40 ml-4">Project Name</Label>
              <Input 
                required
                value={editingProject?.name || ""}
                onChange={e => setEditingProject(prev => prev ? {...prev, name: e.target.value} : null)}
                className="bg-white/5 border-white/10 rounded-full py-6 px-6 focus:border-white/20" 
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-white/40 ml-4">Status</Label>
                  <select 
                    value={editingProject?.status || "In Progress"}
                    onChange={e => setEditingProject(prev => prev ? {...prev, status: e.target.value as Project["status"]} : null)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 px-6 text-sm appearance-none focus:outline-none focus:border-white/20"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-white/40 ml-4">Progress (%)</Label>
                  <Input 
                    type="number"
                    min="0"
                    max="100"
                    value={editingProject?.progress || 0}
                    onChange={e => setEditingProject(prev => prev ? {...prev, progress: parseInt(e.target.value)} : null)}
                    className="bg-white/5 border-white/10 rounded-full py-4 text-center" 
                  />
               </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="liquid-glass-strong w-full rounded-full py-6 text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
         <DialogContent className="bg-neutral-950 border border-white/10 rounded-[2.5rem] p-0 overflow-hidden font-body text-white max-w-2xl">
            <div className="relative h-48 bg-white/5 flex items-center justify-center">
               <div className="liquid-glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-widest text-white/60">
                 Project Intel
               </div>
               <button onClick={() => setIsDetailsOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/40 transition-colors">
                  <X className="w-5 h-5" />
               </button>
            </div>
            <div className="p-12 space-y-8">
               <div className="space-y-4">
                  <h3 className="text-4xl font-heading italic text-white leading-none">{selectedProject?.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/40 tracking-wider h-fit">{selectedProject?.type}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-xs text-white/40 uppercase tracking-[0.2em]">{selectedProject?.status}</span>
                  </div>
               </div>
               <p className="text-white/60 text-lg font-light leading-relaxed font-body">
                 {selectedProject?.description}
               </p>
               <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                  <div className="space-y-2">
                     <p className="text-[10px] uppercase tracking-widest text-white/30">Last Modified</p>
                     <p className="text-white text-sm">April 19, 2026</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] uppercase tracking-widest text-white/30">Success Score</p>
                     <p className="text-emerald-400 text-sm font-medium">9.8/10 Accurate</p>
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>

    </div>
  );
}
