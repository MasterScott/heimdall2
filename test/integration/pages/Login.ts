import axios from 'axios';

export async function login(page, USER) {
  await expect(page).toFillForm('form[name="login_form"]', {
    login: USER.email,
    password: USER.password
  });

  const wait = page.waitForNavigation();
  page.click('#login');
  const response = await page.waitForResponse(
    res => res.url() === 'http://localhost:3000/authn/login'
  );

  if (response.status() == 201 || response.status() == 401) {
    await wait;
  }
  const data = await response.status();
  return data;
}

export async function register(USER) {
  return axios
    .post('http://localhost:3000/users', USER)
    .then(({data}) => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}
