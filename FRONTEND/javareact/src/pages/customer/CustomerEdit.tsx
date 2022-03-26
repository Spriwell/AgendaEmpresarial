import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkbox, checkmark, colorPalette, pencil, pencilOutline, pencilSharp, search, skull, text } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import ICustomer from './Customer';
import { removeCustomer, saveCustomer, searchCustomerById, searchCustomers } from './CustomerApi';

const CustomerEdit: React.FC = () => {

    const { name } = useParams<{ name: string; }>();
    const [customer, setCustomer] = useState<ICustomer>({});
    const history = useHistory();

    const routeMatch: any = useRouteMatch("/page/customer/:id")
    const id = routeMatch?.params?.id;
    useEffect(() => {search();}, [history.location.pathname])

    const search = async () => {
        if(id == 'new') {
            setCustomer({});
        } else {
            let result = await searchCustomerById(id);
            setCustomer(result);
        }
    }

    const save = async () => {
        await saveCustomer(customer);
        history.push('/page/customers')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <IonTitle>{id == 'new' ? 'Add Customer' : 'Edit Customer'}</IonTitle> 
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Firstname</IonLabel>
                                    <IonInput onIonChange={e => customer.firstname = String(e.detail.value)} value={customer.firstname}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Lastname</IonLabel>
                                    <IonInput onIonChange={e => customer.lastname = String(e.detail.value)} value={customer.lastname}> </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">E-mail</IonLabel>
                                    <IonInput onIonChange={e => customer.email = String(e.detail.value)} value={customer.email}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Phone</IonLabel>
                                    <IonInput onIonChange={e => customer.phone = String(e.detail.value)} value={customer.phone}> </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Address</IonLabel>
                                    <IonInput onIonChange={e => customer.address = String(e.detail.value)} value={customer.address}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Notes</IonLabel>
                                    <IonInput onIonChange={e => customer.notes = String(e.detail.value)} value={customer.notes}> </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonItem><IonButton onClick={save} color='success' fill='solid' slot='end'><IonIcon icon={checkmark}/> Save Customer</IonButton></IonItem>
                    </IonCard>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default CustomerEdit;
