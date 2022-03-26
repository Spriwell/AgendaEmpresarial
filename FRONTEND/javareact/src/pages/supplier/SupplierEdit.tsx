import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkbox, checkmark, colorPalette, pencil, pencilOutline, pencilSharp, search, skull, text } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import ISupplier from './Supplier';
import { removeSupplier, saveSupplier, searchSupplierById, searchSuppliers } from './SupplierApi';

const SupplierEdit: React.FC = () => {

    const { name } = useParams<{ name: string; }>();
    const [supplier, setSupplier] = useState<ISupplier>({});
    const history = useHistory();

    const routeMatch: any = useRouteMatch("/page/supplier/:id")
    const id = routeMatch?.params?.id;
    useEffect(() => {search();}, [history.location.pathname])

    const search = async () => {
        if(id != 'new') {
            let result = await searchSupplierById(id);
            setSupplier(result);
        }
    }

    const save = async () => {
        await saveSupplier(supplier);
        history.push('/page/suppliers')
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
                        <IonTitle>{id == 'new' ? 'Add Supplier' : 'Edit Supplier'}</IonTitle> 
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Name</IonLabel>
                                    <IonInput onIonChange={e => supplier.name = String(e.detail.value)} value={supplier.name}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Contact</IonLabel>
                                    <IonInput onIonChange={e => supplier.contact = String(e.detail.value)} value={supplier.contact}> </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">E-mail</IonLabel>
                                    <IonInput onIonChange={e => supplier.email = String(e.detail.value)} value={supplier.email}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Phone</IonLabel>
                                    <IonInput onIonChange={e => supplier.phone = String(e.detail.value)} value={supplier.phone}> </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Address</IonLabel>
                                    <IonInput onIonChange={e => supplier.address = String(e.detail.value)} value={supplier.address}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Web</IonLabel>
                                    <IonInput onIonChange={e => supplier.web = String(e.detail.value)} value={supplier.web}> </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow> <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Notes</IonLabel>
                                    <IonInput onIonChange={e => supplier.notes = String(e.detail.value)} value={supplier.notes}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                            </IonCol>
                        </IonRow>
                        <IonItem><IonButton onClick={save} color='success' fill='solid' slot='end'><IonIcon icon={checkmark}/> Save Supplier</IonButton></IonItem>
                    </IonCard>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default SupplierEdit;
