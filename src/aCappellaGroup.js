document.addEventListener('DOMContentLoaded', () => {
  const apiURL = 'http://localhost:3000/a_cappella_groups'
  const tableBodyElement = document.getElementById('table-body')
  const winnerBox = document.getElementById('winner')
  let allGroups
  let winnerName = document.createElement('span')
  winnerBox.appendChild(winnerName)

  function getGroups () {
    fetch(apiURL)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        allGroups = json
        showAllGroups(json)
      })
  }
  function showAllGroups (json) {
    for (const group of json) {
      showSingleGroup(group)
    }
  }
  function showSingleGroup (group) {
    let groupRow = document.createElement('tr')
    groupRow.setAttribute('class', 'body')
    let college = document.createElement('td')
    college.innerText = group.college.name
    let name = document.createElement('td')
    name.innerText = group.name
    let membership = document.createElement('td')
    membership.innerText = group.membership
    let division = document.createElement('td')
    division.innerText = group.college.division
    let winner = document.createElement('td')
    let trophy = document.createElement('img')
    trophy.setAttribute('class', 'trophy')
    trophy.setAttribute('src', 'assets/trophy.png')
    trophy.setAttribute('data-id', `${(group.id)}`)
    winner.setAttribute('data-id', `${(group.id)}`)
    winner.appendChild(trophy)
    winner.addEventListener('click', makeWinner)
    tableBodyElement.appendChild(groupRow)
    groupRow.appendChild(college)
    groupRow.appendChild(name)
    groupRow.appendChild(membership)
    groupRow.appendChild(division)
    groupRow.appendChild(winner)
  }
  function makeWinner (event) {
    let groupID = event.target.dataset.id - 1
    let group = allGroups[`${groupID}`]
    winnerName.innerText = group.name
    showRows()
  }
  function showRows () {
    let allRows = document.querySelectorAll('tr.body')
    for (const row of allRows) {
      if (winnerName.innerText !== row.querySelectorAll('td')[1].innerText) {
        row.style.display = ''
      } else {
        row.style.display = 'none'
      }
    }
  }
  getGroups()
})
