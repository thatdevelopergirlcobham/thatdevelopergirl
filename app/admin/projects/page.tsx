import { createAdminClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";
import ProjectManager from "./ProjectManager";

export default async function ProjectsPage() {
  const supabase = await createAdminClient();
  const { data: raw } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });
  const projects = (raw || []) as Project[];

  return <ProjectManager projects={projects} />;
}
