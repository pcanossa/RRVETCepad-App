// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiTokenUrl: 'https://auth-pay.lytex.com.br/v1/oauth/obtain_token',
  apiInvoice: 'https://api-pay.lytex.com.br/v1/invoices',
  apiClient: '648eeb925dc56f000b766d47',
  apiSecret: 'I9e48FztqmtfiJNE1X4tloFvurXlE2xz4LAFHxvBLxNJoQWnr59cHYZelGHYTmEnkVL50bsKidtANH8CZAzxbO2e7C3sfvMWsLRASYdtd9QD76pi9oL4j7QIhrHeE8ajmyyX3goSy5Ec0B0T0qH9teNDkMw5K0M6h6hxTFJKncGhSa8F3yv6Q4svx0HpRvjAI4E7YW2ItSAuWsgpon6svEYLEFTUpx5D6l610ZweFAGGK7Ja55SsuPOu60AIw5wi',
  apiInstallment: 'https://api-pay.lytex.com.br/v1/installment',
  apiFaturamentos: 'https://api-pay.lytex.com.br/v1/invoices?search=',
  apiCancel: 'https://api-pay.lytex.com.br/v1/installment/cancel/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
