import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, colorPalette, pencil, pencilOutline, pencilSharp, search, skull } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ICustomer from './Customer';
import { removeCustomer, saveCustomer, searchCustomers } from './CustomerApi';

const CustomerList: React.FC = () => {

    const { name } = useParams<{ name: string; }>();
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const history = useHistory();

    useEffect(() => {search();}, [history.location.pathname])

    const search = async () => {
        let result = await searchCustomers();
        setCustomers(result);
    }

    const remove = async (id: String) => {
        await removeCustomer(id);
        search();
    }

    const addCustomer = () => {
        history.push('/page/customer/new');
    }

    const editCustomer = (id: string) => {
        history.push('/page/customer/' + id)
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
                        <IonTitle>Customer Management</IonTitle> 
                        <IonItem><IonButton onClick={addCustomer} color='primary' fill='solid' slot='end'><IonIcon icon={add}/> Add Customer</IonButton></IonItem>
                        <IonGrid className='table'>
                            <IonRow>
                                <IonCol>Name</IonCol>
                                <IonCol>E-mail</IonCol>
                                <IonCol>Phone</IonCol>
                                <IonCol>Address</IonCol>
                                <IonCol>Notes</IonCol>
                                <IonCol>Tools</IonCol>
                            </IonRow>
                            {customers.map((customer:ICustomer) => 
                                <IonRow>
                                    <IonCol>{customer.firstname} {customer.lastname}</IonCol>
                                    <IonCol>{customer.email}</IonCol>
                                    <IonCol>{customer.phone}</IonCol>
                                    <IonCol>{customer.address}</IonCol>
                                    <IonCol>{customer.notes}</IonCol>
                                    <IonCol>
                                        <IonButton onClick={() => editCustomer(String(customer.id))} color='primary' fill='clear'><IonIcon icon={colorPalette} slot="icon-only" /></IonButton>
                                        <IonButton onClick={() => remove(String(customer.id))} color='danger' fill='clear'><IonIcon icon={skull} slot="icon-only" /></IonButton>
                                    </IonCol>
                                </IonRow>
                            )}
                            
                        </IonGrid>
                    </IonCard>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default CustomerList;
