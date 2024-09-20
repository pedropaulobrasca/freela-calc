"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

export default function Home() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você adicionaria a lógica para processar o e-mail
    console.log("E-mail cadastrado:", email)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-yellow-200 font-mono relative text-zinc-900">
      {/* Conteúdo */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">
            Calculadora Freelance
          </h1>
          <p className="text-2xl mb-8">
            Precifique seus projetos com confiança e estilo!
          </p>
          <Button asChild className="text-2xl px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Link href={"/calculator"}>Experimente Agora!</Link>
          </Button>
        </header>

        {/* Benefícios */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Cálculos Precisos",
              desc: "Determine o valor justo para seus projetos",
            },
            {
              title: "Economia de Tempo",
              desc: "Precifique rapidamente novos trabalhos",
            },
            {
              title: "Design Divertido",
              desc: "Torne o planejamento financeiro agradável",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-blue-500 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
              <p>{benefit.desc}</p>
            </div>
          ))}
        </section>

        {/* Como Funciona */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                desc: "Configure seu perfil com renda desejada e horas de trabalho",
              },
              {
                step: 2,
                desc: "Adicione seus projetos com detalhes de horas e duração",
              },
              {
                step: 3,
                desc: "Receba instantaneamente o valor a cobrar e o prazo estimado",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-green-300 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg"
              >
                <div className="text-5xl font-bold mb-4">{item.step}</div>
                <p className="text-xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Depoimentos */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">
            O Que Dizem Nossos Usuários
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Ana Silva",
                quote:
                  "Essa calculadora mudou minha vida profissional! Agora precificar meus projetos é rápido e divertido.",
              },
              {
                name: "Carlos Oliveira",
                quote:
                  "Design incrível e super fácil de usar. Recomendo para todos os freelancers!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-purple-300 p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg flex flex-col justify-between"
              >
                <p className="text-xl mb-4">"{testimonial.quote}"</p>
                <p className="font-bold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Perguntas Frequentes
          </h2>
          <Accordion
            type="single"
            collapsible
            className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg"
          >
            {[
              {
                q: "A calculadora é gratuita?",
                a: "Sim, nossa calculadora é totalmente gratuita para uso!",
              },
              {
                q: "Posso usar em dispositivos móveis?",
                a: "Claro! Nossa calculadora é responsiva e funciona bem em smartphones e tablets.",
              },
              {
                q: "Meus dados estão seguros?",
                a: "Absolutamente. Não armazenamos nenhuma informação sensível e todos os cálculos são feitos localmente no seu dispositivo.",
              },
            ].map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-xl font-bold mx-4 my-1">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-lg mx-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA Final */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para Revolucionar Sua Precificação?
          </h2>
          <p className="text-2xl mb-8">
            Junte-se a milhares de freelancers satisfeitos!
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow border-4 border-black text-lg p-4 placeholder:text-zinc-800"
              />
              <Button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-lg px-6"
              >
                Começar
              </Button>
            </div>
          </form>
        </section>

        {/* Footer */}
        <footer className="text-center">
          <p>
            &copy; 2024 Calculadora Freelance. Todos os direitos
            reservados.
          </p>
        </footer>
      </div>
    </div>
  )
}
