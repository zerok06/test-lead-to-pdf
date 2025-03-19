import { useState } from 'react'

const API =
  'https://script.google.com/macros/s/AKfycbzGWW-4lMB7G1uStLBufi_Uz-xk1kgC7AfDuoBhX88AdEXoWlrhgyWesIAzgL09ZdhxoQ/exec'

const FormLeadToPDF = () => {
  const [loading, setLoading] = useState(false)
  const [leadId, setLeadId] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    // Call the API to generate the
    // PDF with the lead data

    const fetching = await fetch(API + '?lead=20603885', {
      method: 'POST',
    })
    const response = await fetching.json()
    if (response.success) {
      setLeadId(response.data.link)
    }
    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Lead ID" value={'20603885'} />
        <button type="submit">Enviar</button>
      </form>
      {leadId && (
        <a href={leadId} target="_blank" rel="noreferrer" download>
          LINK
        </a>
      )}
    </>
  )
}

export default FormLeadToPDF
