const submitBtn = document.querySelector("#submit-btn3");
submitBtn.addEventListener("click", async () => {
  const username = document.querySelector("#username").value;
  const url = `https://api.github.com/users/${username}/following`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    let statusHTML = "";
    data.forEach((status) => {
      statusHTML += `
        <tr>
          <td>${status.login}</td>
          <td><img src="${status.owner.avatar_url}" height="100" width="100"></td>
          <td><a href="${status.html_url}">${status.html_url}</a></td>
        </tr>
      `;
    });
    document.querySelector("tbody").innerHTML = statusHTML;
  } catch (error) {
    console.error(error);
  }
});

