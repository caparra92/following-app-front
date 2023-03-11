import { alertController } from '@ionic/vue';
import { Ref } from 'vue';

export const deleteAlert = async (handlerMessage:Ref<string>, items: any) => {
    const alert = await alertController.create({
      header: 'Do you want to delete?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            handlerMessage.value = 'cancel';
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            handlerMessage.value = 'confirm';
          },
        },
      ],
    });
    await alert.present();  
    const { role }: any = await alert.onDidDismiss();
    handlerMessage.value = role;
};

export const successAlert = async (message: string) => {
  const alert = await alertController.create({
    header: "Success",
    message,
    buttons: ["Ok"],
  });

  await alert.present();
};

export const errorAlert = async (message: string) => {
  const alert = await alertController.create({
    header: "Error",
    message: message,
    buttons: ["Try again"],
  });

  await alert.present();
};
