import WorkoutForm from '@/components/workout-builder/workout-form';
import PageWrapper from '@/components/layout/page-wrapper'
import { Dumbbell } from 'lucide-react'

function WorkoutBuilderPage() {
    return (
        <PageWrapper
            title="Workout Builder"
            icon={Dumbbell}
            subtitle="Create a new workout"
        >
            <WorkoutForm />
        </PageWrapper>
    )
}

export default WorkoutBuilderPage;