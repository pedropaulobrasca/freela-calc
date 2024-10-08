"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Importar os ícones do Feather Icons via react-icons
import { FiCheck, FiTrash2 } from "react-icons/fi"

interface Profile {
  monthlyIncome: number
  hoursPerDay: number
  daysPerWeek: number
  vacationWeeks: number
}

interface Job {
  name: string
  hoursPerDay: number
  totalHours: number
  isCompleted: boolean
}

export default function Calculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    monthlyIncome: 5000,
    hoursPerDay: 8,
    daysPerWeek: 5,
    vacationWeeks: 4,
  })
  const [jobs, setJobs] = useState<Job[]>([])
  const [newJob, setNewJob] = useState<Job>({
    name: "",
    hoursPerDay: 0,
    totalHours: 0,
    isCompleted: false,
  })

  // Define isMounted como true após o componente montar
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Carrega dados do localStorage após o componente montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("profile")
      const savedJobs = localStorage.getItem("jobs")

      if (savedProfile) {
        try {
          setProfile(JSON.parse(savedProfile))
        } catch (error) {
          console.error("Erro ao carregar o perfil:", error)
        }
      }

      if (savedJobs) {
        try {
          setJobs(JSON.parse(savedJobs))
        } catch (error) {
          console.error("Erro ao carregar os jobs:", error)
        }
      }
    }
  }, [])

  // Salva o perfil no localStorage quando ele muda
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("profile", JSON.stringify(profile))
    }
  }, [profile, isMounted])

  // Salva os jobs no localStorage quando eles mudam
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("jobs", JSON.stringify(jobs))
    }
  }, [jobs, isMounted])

  const calculateHourlyRate = () => {
    const weeksPerYear = 52 - profile.vacationWeeks
    const hoursPerYear =
      profile.hoursPerDay * profile.daysPerWeek * weeksPerYear
    const yearlyIncome = profile.monthlyIncome * 12
    return yearlyIncome / hoursPerYear
  }

  const addJob = () => {
    if (newJob.name && newJob.hoursPerDay > 0 && newJob.totalHours > 0) {
      setJobs([...jobs, { ...newJob, isCompleted: false }])
      setNewJob({ name: "", hoursPerDay: 0, totalHours: 0, isCompleted: false })
    }
  }

  const deleteJob = (index: number) => {
    const updatedJobs = [...jobs]
    updatedJobs.splice(index, 1)
    setJobs(updatedJobs)
  }

  const toggleJobCompletion = (index: number) => {
    const updatedJobs = [...jobs]
    updatedJobs[index].isCompleted = !updatedJobs[index].isCompleted
    setJobs(updatedJobs)
  }

  const hourlyRate = calculateHourlyRate()

  // Não renderiza nada no servidor para evitar erros de hidratação
  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-yellow-200 p-8 font-mono text-zinc-900 flex justify-center items-center">
      {/* Conteúdo */}
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Calculadora Freelance
        </h1>

        {/* Perfil */}
        <Card className="mb-8 bg-pink-300 border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Seu Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Campos do perfil */}
            <div>
              <Label htmlFor="monthlyIncome">Renda Mensal Desejada (R$)</Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={profile.monthlyIncome}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    monthlyIncome: Number(e.target.value),
                  })
                }
                className="border-2 border-black"
              />
            </div>
            <div>
              <Label htmlFor="hoursPerDay">Horas por Dia</Label>
              <Input
                id="hoursPerDay"
                type="number"
                value={profile.hoursPerDay}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    hoursPerDay: Number(e.target.value),
                  })
                }
                className="border-2 border-black"
              />
            </div>
            <div>
              <Label htmlFor="daysPerWeek">Dias por Semana</Label>
              <Input
                id="daysPerWeek"
                type="number"
                value={profile.daysPerWeek}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    daysPerWeek: Number(e.target.value),
                  })
                }
                className="border-2 border-black"
              />
            </div>
            <div>
              <Label htmlFor="vacationWeeks">Semanas de Férias por Ano</Label>
              <Input
                id="vacationWeeks"
                type="number"
                value={profile.vacationWeeks}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    vacationWeeks: Number(e.target.value),
                  })
                }
                className="border-2 border-black"
              />
            </div>
          </CardContent>
        </Card>

        {/* Adicionar Novo Job */}
        <Card className="mb-8 bg-blue-300 border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Adicionar Novo Job
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Campos do novo job */}
            <div>
              <Label htmlFor="jobName">Nome do Job</Label>
              <Input
                id="jobName"
                value={newJob.name}
                onChange={(e) =>
                  setNewJob({ ...newJob, name: e.target.value })
                }
                className="border-2 border-black"
              />
            </div>
            <div>
              <Label htmlFor="jobHoursPerDay">Horas por Dia neste Job</Label>
              <Input
                id="jobHoursPerDay"
                type="number"
                value={newJob.hoursPerDay}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    hoursPerDay: Number(e.target.value),
                  })
                }
                className="border-2 border-black"
              />
            </div>
            <div>
              <Label htmlFor="jobTotalHours">Total de Horas para o Job</Label>
              <Input
                id="jobTotalHours"
                type="number"
                value={newJob.totalHours}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    totalHours: Number(e.target.value),
                  })
                }
                className="border-2 border-black"
              />
            </div>
            <Button
              onClick={addJob}
              className="w-full bg-green-400 hover:bg-green-500 text-black font-bold border-2 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]"
            >
              Adicionar Job
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Jobs */}
        <Card className="bg-purple-300 border-4 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Lista de Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {jobs.length === 0 ? (
              <p>Nenhum job adicionado.</p>
            ) : (
              <ul className="space-y-4">
                {jobs.map((job, index) => {
                  const daysToComplete = job.totalHours / job.hoursPerDay
                  const jobCost = job.totalHours * hourlyRate
                  return (
                    <li
                      key={index}
                      className={`relative p-4 rounded-lg border-2 border-black shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] ${
                        job.isCompleted ? "bg-gray-300" : "bg-white"
                      }`}
                    >
                      {/* Botões posicionados no canto superior direito */}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          onClick={() => toggleJobCompletion(index)}
                          aria-label={
                            job.isCompleted
                              ? "Marcar como não concluído"
                              : "Marcar como concluído"
                          }
                          className={`p-1 border-2 border-black shadow-sm text-zinc-900 h-full ${
                            job.isCompleted
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-yellow-300 hover:bg-yellow-400"
                          }`}
                        >
                          <FiCheck size={16} />
                        </Button>
                        <Button
                          onClick={() => deleteJob(index)}
                          aria-label="Excluir job"
                          className="p-1 bg-red-400 hover:bg-red-500 border-2 border-black shadow-sm text-zinc-900 h-full"
                        >
                          <FiTrash2 size={16} />
                        </Button>
                      </div>

                      {/* Conteúdo do Job */}
                      <div className="">
                        <h3 className="text-xl font-bold mb-2 pr-16">
                          {job.name}
                        </h3>
                        <p>Prazo: {daysToComplete.toFixed(1)} dias</p>
                        <p>Horas por dia: {job.hoursPerDay}h</p>
                        <p>Valor: R$ {jobCost.toFixed(2)}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
