import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Sparkles, CreditCard, Mail, Upload, Palette, FileText, ArrowRight, Lock, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// MVP single-file React component for a landing + intake form.
// Styling: TailwindCSS (no import needed in this sandbox). Uses shadcn/ui components.
// Replace the STRIPE_LINK const with your real Stripe Payment Link (test mode ok).

const STRIPE_LINK = "#replace-with-stripe-payment-link";

const features = [
  { icon: Shield, title: "Affiches pro, prêtes à imprimer", text: "Mise en page nette (A4/A3), typographies lisibles, marges et grilles soignées." },
  { icon: Sparkles, title: "IA pour texte & visuels", text: "Contenu rédigé avec GPT et illustrations générées avec style cohérent." },
  { icon: CreditCard, title: "Commande en 2 minutes", text: "Formulaire + paiement Stripe. Livraison PDF HD par e‑mail (POD en option)." },
];

const pricing = [
  { title: "Affiche unique", price: "49–149 €", perks: ["1 thème", "1 révision incluse", "PDF HD + aperçu web"] },
  { title: "Pack 5 affiches", price: "199–499 €", perks: ["5 thèmes", "3 révisions", "PDF HD + archives"] },
  { title: "Abonnement trimestriel", price: "99–199 €/mois", perks: ["2 affiches / mois", "priorité prod.", "suivi dédié"] },
];

function Input({ label, type = "text", ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-neutral-600">{label}</span>
      <input
        type={type}
        className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 p-3 outline-none ring-0 focus:border-neutral-400"
        {...props}
      />
    </label>
  );
}

function TextArea({ label, rows = 4, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-neutral-600">{label}</span>
      <textarea
        rows={rows}
        className="mt-1 w-full rounded-xl border border-neutral-200 bg-white/80 p-3 outline-none ring-0 focus:border-neutral-400"
        {...props}
      />
    </label>
  );
}

export default function AffichesIALanding() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    window.location.href = STRIPE_LINK;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-900 via-indigo-800 to-sky-700 text-white">
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" /> Affiches pédagogiques / métiers à la demande
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Créez des <span className="text-cyan-300">affiches personnalisées</span> en quelques minutes
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/90">
            Sensibilisation sécurité, procédures métiers, supports éducatifs. Contenu rédigé + illustrations IA, mise en page
            automatisée, PDF HD prêt à imprimer. Option impression (POD).
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={handleCheckout} className="rounded-2xl bg-cyan-400 text-black hover:bg-cyan-300">
              Commander maintenant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="#form" className="rounded-2xl bg-white/10 px-5 py-3 text-white hover:bg-white/20">
              Brief rapide
            </a>
          </div>
        </motion.div>
      </header>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <Card key={i} className="rounded-2xl bg-white/10 text-white backdrop-blur-sm">
              <CardContent className="p-6">
                <f.icon className="h-8 w-8" />
                <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-white/90">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Example preview (static link in chat) */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="rounded-3xl bg-white p-6 text-neutral-900">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <ImageIcon className="h-4 w-4" /> Exemple d’affiche générée (cybersécurité au travail)
          </div>
          <p className="mt-2 text-neutral-700">
            Téléchargez l’aperçu et le PDF HD dans la conversation (“Affiche cybersécurité”). Vous pourrez les utiliser comme
            démonstrateur MVP.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              "Briefez votre besoin",
              "Paiement Stripe",
              "Livraison PDF prête à imprimer",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 text-green-600" />
                <span className="text-sm text-neutral-800">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 py-8" id="pricing">
        <h2 className="text-2xl font-semibold">Offres & tarifs</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {pricing.map((p) => (
            <Card key={p.title} className="rounded-2xl bg-white text-neutral-900">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-neutral-500">{p.title}</div>
                <div className="mt-1 text-3xl font-bold">{p.price}</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" /> {perk}
                    </li>
                  ))}
                </ul>
                <Button onClick={handleCheckout} className="mt-6 w-full rounded-xl bg-neutral-900 text-white hover:bg-neutral-800">
                  Choisir cette offre
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Intake Form */}
      <section className="mx-auto max-w-6xl px-6 py-12" id="form">
        <div className="rounded-3xl bg-white p-6 text-neutral-900">
          <div className="flex items-center gap-2 text-neutral-700">
            <FileText className="h-5 w-5" /> Brief rapide
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            Donnez-nous les infos essentielles. Nous générons le contenu et la mise en page. Vous validez avant impression.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Input label="E‑mail de livraison" type="email" placeholder="vous@entreprise.fr" />
            <Input label="Société / École (optionnel)" placeholder="Nom de l’organisation" />
            <Input label="Thème de l’affiche" placeholder="p. ex. Cybersécurité au travail" />
            <Input label="Couleur principale (hex)" placeholder="#6C63FF" />
          </div>
          <div className="mt-4 grid gap-4">
            <TextArea label="Texte / règles à inclure (brefs points)" rows={5} placeholder="Listez 5–10 points clés…" />
            <label className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              <div className="flex items-center gap-2"><Upload className="h-4 w-4" /> Logo (PNG/SVG) – optionnel</div>
              <Button variant="outline" className="rounded-xl">Importer</Button>
            </label>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button onClick={handleCheckout} className="rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800">
              Passer au paiement <CreditCard className="ml-2 h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Lock className="h-4 w-4" /> Paiement sécurisé par Stripe
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-sm text-white/80">
          <div>© {new Date().getFullYear()} Syloria – Affiches IA</div>
          <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@syloria.com</div>
          <div className="flex items-center gap-2"><Palette className="h-4 w-4" /> Marque blanche sur demande</div>
        </div>
      </footer>
    </div>
  );
}
