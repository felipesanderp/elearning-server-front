"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Lessons } from "@prisma/client"

import { courseCreateSchema } from '@/lib/validations/course'
import { MultiStep } from '@ignite-ui/react'
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

type FormData = z.infer<typeof courseCreateSchema>

interface CreateCourseFormProps {
  lessons: Pick<Lessons, "id" | "name">[]
}

export function CreateCourseForm({ lessons }: CreateCourseFormProps) {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  
  const form = useForm<FormData>({
    resolver: zodResolver(courseCreateSchema),
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
      imageURL: '',
      lessonId: undefined,
    }
  })

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep= () => {
    setStep(step - 1)
  }

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    if (data.lessonId !== undefined) {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          imageURL: data.imageURL,
          lessonId: data.lessonId,
        })
      })

      if (!response.ok) {
        return toast({
          title: "Something went wrong.",
          description: "The course was not created! Please, try again.",
          variant: "destructive"
        })
      }

      toast({
        title: "Course created.",
        description: "The course was created! Check the lessons page.",
        variant: 'success'
      })
    } else {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          imageURL: data.imageURL,
        })
      })

      if (!response.ok) {
        return toast({
          title: "Something went wrong.",
          description: "The course was not created! Please, try again.",
          variant: "destructive"
        })
      }

      toast({
        title: "Course created.",
        description: "The course was created! Check the lessons page.",
        variant: 'success'
      })
    }

    setStep(1)
    form.reset()
    setIsSaving(false)
    
    router.refresh()
  }

  const formStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col space-y-6">
            <MultiStep size={5} currentStep={step} />
            <div className="flex flex-col items-start space-y-4">
              <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
                Vamos começar definindo o titulo dessa curso.
              </p>
              <Label htmlFor="title" className="text-right">Titulo</Label>
              <Input 
                {...form.register('title')}
              />
              {form.formState.errors.title && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
              <Button
                type="button"
                disabled={form.formState.errors.title ? true : false} 
                onClick={nextStep}
              >
                Avançar
              </Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="flex flex-col space-y-6">
            <MultiStep size={5} currentStep={step} />
            <div className="flex flex-col items-start space-y-4">
              <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
                Adicione uma descrição para essa curso.
              </p>
              <Label htmlFor="description" className="text-right">Descrição</Label>
              <Textarea  
                {...form.register('description')}
              />
              {form.formState.errors.description && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button
                  type="button"
                  disabled={form.formState.errors.description ? true : false} 
                  onClick={nextStep}
                >
                  Avançar
                </Button>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="flex flex-col space-y-6">
            <MultiStep size={5} currentStep={step}/>
            <div className="flex flex-col items-start space-y-4">
              <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
                Qual o link para a imagem de fundo desse curso?
              </p>
              <Label htmlFor="imageURL" className="text-right">Link</Label>
              <Input
                {...form.register('imageURL')}
              />
              {form.formState.errors.imageURL && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.imageURL.message}
                </p>
              )}
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button
                  type="button"
                  disabled={form.formState.errors.imageURL ? true : false}
                  onClick={nextStep}
                >
                  Avançar
                </Button>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="flex flex-col space-y-6">
            <MultiStep size={5} currentStep={step} />
            <div className="flex flex-col items-start space-y-4">
              <p className="text-md font-semibold text-slate-900 dark:text-slate-50">
                Por último, você deseja vincular uma aula a esse curso?
              </p>
              <FormField 
                control={form.control}
                name="lessonId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a lesson..."></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {lessons.map((lesson) => (
                          <SelectItem 
                            key={lesson.id} 
                            value={lesson.id}
                          >
                            {lesson.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <div className="flex items-center gap-4">
                <Button onClick={prevStep}>Voltar</Button>
                <Button 
                  disabled={form.formState.errors.lessonId ? true : false} 
                  onClick={nextStep}
                >
                  Avançar
                </Button>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <h1>{form.getValues('title')}</h1>
            <h1>{form.getValues('description')}</h1>
            <h1>{form.getValues('imageURL')}</h1>
            <h1>Lesson: {form.getValues('lessonId')}</h1>
            <Button 
              type="submit"
              disabled={isSaving}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Enviar
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          className={cn(
          buttonVariants()
          )}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          New Course
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="default">
        <SheetHeader className="mb-4">
          <SheetTitle>Create Course</SheetTitle>
          <SheetDescription>
            Create a new course!
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {formStep()}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}