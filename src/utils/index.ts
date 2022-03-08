import { toastController } from '@ionic/vue';

// TODO Use separate files for specific utilities

// TODO Remove it when HC APIs are fully REST compliant
const hasError = (response: any) => {
    return !!response.data._ERROR_MESSAGE_ || !!response.data._ERROR_MESSAGE_LIST_;
}

const showToast = async (message: string) => {
    const toast = await toastController
        .create({
          message,
          duration: 3000,
          position: 'top',
        })
      return toast.present();
}

const getIdentification = (identifications: any, id: string) => {
  let externalId = ''
  if (identifications) {
    const externalIdentification = identifications.find((identification: any) => identification.startsWith(id))
    const externalIdentificationSplit = externalIdentification ? externalIdentification.split('/') : [];
    externalId = externalIdentificationSplit[1] ? externalIdentificationSplit[1] : '';
  }
  return externalId;
}

const getCustomerLoyalty = (orderNotes: any, customerLoyaltyOptions: any) => {
  let customerLoyalty = '' as any
  if (orderNotes && customerLoyaltyOptions) {
    for (const customerLoyaltyOption of Object.entries(customerLoyaltyOptions)) {
      if (orderNotes.includes(customerLoyaltyOption[0])) {
        customerLoyalty = customerLoyaltyOption[1];
      }
    }
  }
  return customerLoyalty;
}

export { showToast, hasError, getCustomerLoyalty, getIdentification }
