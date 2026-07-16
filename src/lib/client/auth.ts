export async function signIn(provider: string, options?: { callbackUrl?: string }) {
  const csrfRes = await fetch('/api/auth/csrf').then(res => res.json())
  const csrfToken = csrfRes.csrfToken

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = `/api/auth/signin/${provider}`

  const inputCsrf = document.createElement('input')
  inputCsrf.type = 'hidden'
  inputCsrf.name = 'csrfToken'
  inputCsrf.value = csrfToken
  form.appendChild(inputCsrf)

  if (options?.callbackUrl) {
    const inputCallback = document.createElement('input')
    inputCallback.type = 'hidden'
    inputCallback.name = 'callbackUrl'
    inputCallback.value = options.callbackUrl
    form.appendChild(inputCallback)
  }

  document.body.appendChild(form)
  form.submit()
}

export async function signOut(options?: { callbackUrl?: string }) {
  const csrfRes = await fetch('/api/auth/csrf').then(res => res.json())
  const csrfToken = csrfRes.csrfToken

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = '/api/auth/signout'

  const inputCsrf = document.createElement('input')
  inputCsrf.type = 'hidden'
  inputCsrf.name = 'csrfToken'
  inputCsrf.value = csrfToken
  form.appendChild(inputCsrf)

  if (options?.callbackUrl) {
    const inputCallback = document.createElement('input')
    inputCallback.type = 'hidden'
    inputCallback.name = 'callbackUrl'
    inputCallback.value = options.callbackUrl
    form.appendChild(inputCallback)
  }

  document.body.appendChild(form)
  form.submit()
}
