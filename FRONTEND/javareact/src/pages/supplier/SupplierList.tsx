import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, colorPalette, pencil, pencilOutline, pencilSharp, search, skull } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import ISupplier from './Supplier';
import { removeSupplier, saveSupplier, searchSuppliers } from './SupplierApi';

const SupplierList: React.FC = () => {

    const { name } = useParams<{ name: string; }>();
    const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
    const history = useHistory();

    useEffect(() => {search();}, [history.location.pathname])

    const search = async () => {
        let result = await searchSuppliers();
        setSuppliers(result);
    }

    const remove = async (id: String) => {
        await removeSupplier(id);
        search();
    }

    const addSupplier = () => {
        history.push('/page/supplier/new');
    }

    const editSupplier = (id: string) => {
        history.push('/page/supplier/' + id)
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
                        <IonTitle>Supplier Management</IonTitle> 
                        <IonItem><IonButton onClick={addSupplier} color='primary' fill='solid' slot='end'><IonIcon icon={add}/> Add Supplier</IonButton></IonItem>
                        <IonGrid className='table'>
                            <IonRow>
                                <IonCol>Name</IonCol>
                                <IonCol>E-mail</IonCol>
                                <IonCol>Phone</IonCol>
                                <IonCol>Web</IonCol>
                                <IonCol>Notes</IonCol>
                                <IonCol>Tools</IonCol>
                            </IonRow>
                            {suppliers.map((supplier:ISupplier) => 
                                <IonRow>
                                    <IonCol>{supplier.name}</IonCol>
                                    <IonCol>{supplier.email}</IonCol>
                                    <IonCol>{supplier.phone}</IonCol>
                                    <IonCol>{supplier.web}</IonCol>
                                    <IonCol>{supplier.notes}</IonCol>
                                    <IonCol>
                                        <IonButton onClick={() => editSupplier(String(supplier.id))} color='primary' fill='clear'><IonIcon icon={colorPalette} slot="icon-only" /></IonButton>
                                        <IonButton onClick={() => remove(String(supplier.id))} color='danger' fill='clear'><IonIcon icon={skull} slot="icon-only" /></IonButton>
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

export default SupplierList;
