const fetchData = (username, endpoint, columns) => {
  const request = new XMLHttpRequest();
  request.open('GET', `https://api.github.com/users/${username}/${endpoint}`, true);
  
  request.onload = () => {
    const data = JSON.parse(request.response);
    
    if (request.status >= 200 && request.status < 400) {
      let statusHTML = '';
      statusHTML += '<tr>';
      columns.forEach(column => {
        statusHTML += `<th>${column}</th>`;
      });
      statusHTML += '</tr>';
      data.forEach(status => {
        statusHTML += '<tr>';
        columns.forEach(column => {
          if (column === 'html_url') {
            statusHTML += `<td><a href="${status[column]}">${status[column]}</a></td>`;
          } else if (column === 'avatar_url') {
            statusHTML += `<td><img src="${status.avatar_url}" width="150" height="150"></td>`;
          } else {
            statusHTML += `<td>${status[column]}</td>`;
          }
        });
        statusHTML += '</tr>';
      });
      document.querySelector('tbody').innerHTML = statusHTML;
    } else {
      document.querySelector('tbody').innerHTML = '<tr><td class="text-center">User not found or an error occurred</td></tr>';
    }
  }
  request.send();
}

document.querySelector('#submit-btn').addEventListener('click', () => {
  const username = document.querySelector('#username').value.trim();
  fetchData(username, 'repos', ['full_name', 'language', 'html_url']);
});

document.querySelector('#submit-btn2').addEventListener('click', () => {
  const username = document.querySelector('#username').value.trim();
  fetchData(username, 'gists', ['html_url', 'created_at']);
});

document.querySelector('#submit-btn3').addEventListener('click', () => {
  const username = document.querySelector('#username').value.trim();
  fetchData(username, 'following', ['avatar_url', 'login', 'html_url']);
});

document.querySelector('#submit-btn4').addEventListener('click', () => {
  const username = document.querySelector('#username').value.trim();
  fetchData(username, 'followers', ['avatar_url', 'login', 'html_url']);
});
