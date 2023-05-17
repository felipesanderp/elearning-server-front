import { EditCourseForm } from "@/components/edit-course-form"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

interface EditCoursePageProps {
  params: { courseId: string }
}

export default async function EditCoursePage({ params }:EditCoursePageProps) {  
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Manage Course"
        text="Edit, delete and add new items to this course only."
      />
      <EditCourseForm 
        courseId={params.courseId}
      />
    </DashboardShell>
  )
}