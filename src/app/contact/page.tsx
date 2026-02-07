'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, ChevronRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'

export default function ContactPage() {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      addToast('Please fill in all required fields', 'error')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      addToast('Message sent successfully! We\'ll get back to you soon.', 'success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">Contact Us</h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">Contact</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border border-[#ebebeb] p-6 sm:p-8">
              <h2 className="text-[20px] font-bold text-[#000] mb-6 pb-4 border-b border-[#ebebeb]">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#f6f6f6] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#a749ff]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#000] mb-1">Email</h3>
                    <p className="text-[14px] text-[#555]">support@sellora.com</p>
                    <p className="text-[14px] text-[#555]">sales@sellora.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#f6f6f6] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#a749ff]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#000] mb-1">Phone</h3>
                    <p className="text-[14px] text-[#555]">+1 (555) 123-4567</p>
                    <p className="text-[14px] text-[#555]">+1 (555) 987-6543</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#f6f6f6] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#a749ff]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#000] mb-1">Address</h3>
                    <p className="text-[14px] text-[#555]">
                      123 Commerce Street<br />
                      New York, NY 10013<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#f6f6f6] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#a749ff]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#000] mb-1">Hours</h3>
                    <p className="text-[14px] text-[#555]">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#a749ff] p-6 sm:p-8 text-white">
              <h3 className="text-[18px] font-bold mb-3">Need Help?</h3>
              <p className="text-white/80 text-[14px] mb-4">
                Check out our FAQ section for quick answers to common questions.
              </p>
              <Link
                href="/blog"
                className="text-[14px] font-medium text-white uppercase tracking-wide relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-white hover:after:bg-transparent transition-all"
              >
                Visit Our Blog
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="border border-[#ebebeb] p-6 sm:p-8">
              <h2 className="text-[20px] font-bold text-[#000] mb-6 pb-4 border-b border-[#ebebeb]">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Your Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="john@example.com"
                  />
                </div>

                <Input
                  label="Subject *"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  error={errors.subject}
                  placeholder="How can we help you?"
                />

                <Textarea
                  label="Message *"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  error={errors.message}
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                />

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full md:w-auto"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
