export async function queryHasuraGQL(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
  });
  return await result.json();
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
    query IsNewUser($issuer: String!) {
      users(where: {
        issuer: { _eq: $issuer }
      }) 
        {
          id
          email
          issuer
        } 
      }
    `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );
  return response?.data?.users?.length === 0;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
    mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
      insert_users(objects: {
        email: $email,
        issuer: $issuer,
        publicAddress: $publicAddress
      }}) 
        returning {
          id
          email
          issuer
        } 
      }
    `;

  const { email, issuer, publicAddress } = metadata;

  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { email, issuer, publicAddress },
    token
  );
  return response;
}
