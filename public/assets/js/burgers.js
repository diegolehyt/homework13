// ==========================================\ Client JS logic /============================================== \\
// Make sure we wait to attach our handlers until the DOM is fully loaded.

// Devour button click listener, also fetching the data from our server API rout.
document.querySelectorAll('.change-devoured').forEach(button => {
  button.addEventListener('click', function (event) {
    const id = this.getAttribute('data-id')
    const newdevoured = this.getAttribute('data-devoured')

    fetch(`/api/burgers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ devour: newdevoured })
    }).then(response => {
      if (response.ok) location.reload()
      console.log(response)
    })
  })
})

// Submit new burger button click listener, also fetching the data from our server API rout.
document.getElementById('create-form').addEventListener('submit', event => {
  event.preventDefault()

  const newBurger = {
    name: document.getElementById('burgername').value.trim(),
    devour: true
  }

  fetch(`/api/burgers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBurger)
  }).then(response => {
    console.log(response)
    if (response.ok) location.reload()
  })
})
