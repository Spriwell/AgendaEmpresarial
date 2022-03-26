import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, colorPalette, pencil, pencilOutline, pencilSharp, search, skull } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import IEmployee from './Employee';
import { removeEmployee, saveEmployee, searchEmployees } from './EmployeeApi';

const EmployeeList: React.FC = () => {

    const { name } = useParams<{ name: string; }>();
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const history = useHistory();

    useEffect(() => {search();}, [history.location.pathname])

    const search = async () => {
        let result = await searchEmployees();
        setEmployees(result);
    }

    const remove = async (id: String) => {
        await removeEmployee(id);
        search();
    }

    const addEmployee = () => {
        history.push('/page/Employee/new');
    }

    const editEmployee = (id: string) => {
        history.push('/page/Employee/' + id)
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
                        <IonTitle>Employee Management</IonTitle> 
                        <IonItem><IonButton onClick={addEmployee} color='primary' fill='solid' slot='end'><IonIcon icon={add}/> Add Employee</IonButton></IonItem>
                        <IonGrid className='table'>
                            <IonRow>
                                <IonCol>Name</IonCol>
                                <IonCol>E-mail</IonCol>
                                <IonCol>Phone</IonCol>
                                <IonCol>Address</IonCol>
                                <IonCol>Salary</IonCol>
                                <IonCol>Notes</IonCol>
                                <IonCol>Tools</IonCol>
                            </IonRow>
                            {employees.map((Employee:IEmployee) => 
                                <IonRow>
                                    <IonCol>{Employee.firstname} {Employee.lastname}</IonCol>
                                    <IonCol>{Employee.email}</IonCol>
                                    <IonCol>{Employee.phone}</IonCol>
                                    <IonCol>{Employee.address}</IonCol>
                                    <IonCol>{Employee.salary}</IonCol>
                                    <IonCol>{Employee.notes}</IonCol>
                                    <IonCol>
                                        <IonButton onClick={() => editEmployee(String(Employee.id))} color='primary' fill='clear'><IonIcon icon={colorPalette} slot="icon-only" /></IonButton>
                                        <IonButton onClick={() => remove(String(Employee.id))} color='danger' fill='clear'><IonIcon icon={skull} slot="icon-only" /></IonButton>
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

export default EmployeeList;
