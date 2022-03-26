import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkbox, checkmark, colorPalette, pencil, pencilOutline, pencilSharp, search, skull, text } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import IEmployee from './Employee';
import { removeEmployee, saveEmployee, searchEmployeeById, searchEmployees } from './EmployeeApi';

const EmployeeEdit: React.FC = () => {

    const { name } = useParams<{ name: string; }>();
    const [Employee, setEmployee] = useState<IEmployee>({});
    const history = useHistory();

    const routeMatch: any = useRouteMatch("/page/employee/:id")
    const id = routeMatch?.params?.id;
    useEffect(() => {search();}, [history.location.pathname])

    const search = async () => {
        if(id != 'new') {
            let result = await searchEmployeeById(id);
            setEmployee(result);
        }
    }

    const save = async () => {
        await saveEmployee(Employee);
        history.push('/page/Employees')
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
                        <IonTitle>{id == 'new' ? 'Add Employee' : 'Edit Employee'}</IonTitle> 
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Firstname</IonLabel>
                                    <IonInput onIonChange={e => Employee.firstname = String(e.detail.value)} value={Employee.firstname}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Lastname</IonLabel>
                                    <IonInput onIonChange={e => Employee.lastname = String(e.detail.value)} value={Employee.lastname}> </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">E-mail</IonLabel>
                                    <IonInput onIonChange={e => Employee.email = String(e.detail.value)} value={Employee.email}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Phone</IonLabel>
                                    <IonInput onIonChange={e => Employee.phone = String(e.detail.value)} value={Employee.phone}> </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Address</IonLabel>
                                    <IonInput onIonChange={e => Employee.address = String(e.detail.value)} value={Employee.address}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Salary</IonLabel>
                                    <IonInput onIonChange={e => Employee.salary = Number(e.detail.value)} value={Employee.salary}> </IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="stacked">Notes</IonLabel>
                                    <IonInput onIonChange={e => Employee.notes = String(e.detail.value)} value={Employee.notes}> </IonInput>
                                </IonItem>
                            </IonCol>
                            <IonCol>
                            </IonCol>
                        </IonRow>
                        <IonItem><IonButton onClick={save} color='success' fill='solid' slot='end'><IonIcon icon={checkmark}/> Save Employee</IonButton></IonItem>
                    </IonCard>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default EmployeeEdit;
