const END_POINTS = {
  FOLLOWERS: 'followers',
  FOLLOWING: 'following',
  GISTS: 'gists',
  REPOS: 'repos'
};

const URL = 'https://api.github.com/users/';

const fetchData = (username, endpoint, columns) => {
  return fetch(`${URL}${username}/${endpoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      let statusHTML = '<tr>';
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
      return statusHTML;
    })
    .catch(error => {
      return Promise.reject('User not found or an error occurred');
    });
};

// Example usage with promises
document.querySelector('#submit-btn').addEventListener('click', () => {
  const username = document.querySelector('#username').value.trim();
  fetchData(username, END_POINTS.REPOS, ['full_name', 'language', 'html_url'])
    .then(html => {
      document.querySelector('tbody').innerHTML = html;
    })
    .catch(error => {
      document.querySelector('tbody').innerHTML = `<tr><td class="text-center">${error}</td></tr>`;
    });
});

document.querySelector('#submit-btn2').addEventListener('click', () => {
  const username = document.querySelector('#username').value.trim();
  fetchData(username, END_POINTS.GISTS, ['html_url', 'created_at'])
    .then(html => {
      document.querySelector('tbody').innerHTML = html;
    })
    .catch(error => {
      document.querySelector('tbody').innerHTML = `<tr><td class="text-center">${error}</td></tr>`;
    });
});

document.querySelector('#submit-btn3').addEventListener('click', () => {
  const username = document.querySelector('#username').value.trim();
  fetchData(username, END_POINTS.FOLLOWING, ['avatar_url', 'login', 'html_url'])
    .then(html => {
      document.querySelector('tbody').innerHTML = html;
    })
    .catch(error => {
      document.querySelector('tbody').innerHTML = `<tr><td class="text-center">${error}</td></tr>`;
    });
});

document.querySelector('#submit-btn4').addEventListener('click', () => {
  const username = document.querySelector('#username').value.trim();
  fetchData(username, END_POINTS.FOLLOWING, ['avatar_url', 'login', 'html_url'])
    .then(html => {
      document.querySelector('tbody').innerHTML = html;
    })
    .catch(error => {
      document.querySelector('tbody').innerHTML = `<tr><td class="text-center">${error}</td></tr>`;
    });
});
