import { EditCourseForm } from "@/components/edit-course-form"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EditCoursePageProps {
  params: { courseId: string }
}

export default async function EditCoursePage({ params }:EditCoursePageProps) {  
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Gerencie esse curso"
        text="Edite, delete e adicione novos items à esse curso somente."
      >
        <Link href={`/dashboard/courses/${params.courseId}`}>
          <Button variant="link">Preview</Button>
        </Link>
      </DashboardHeader>
      <EditCourseForm 
        courseId={params.courseId}
      />
    </DashboardShell>
  )
}