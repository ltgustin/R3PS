import { Link, useNavigate } from 'react-router-dom'
import { Plus, BookmarkPlus } from 'lucide-react'
import WorkoutList from '@/components/workout-builder/workout-list'
import PageWrapper from '@/components/layout/page-wrapper'

function WorkoutsPage() {
    const navigate = useNavigate()

    const handleStartWorkout = () => {
        navigate('/workout')
    }

    return (
        <PageWrapper
            title="Workouts"
            icon={BookmarkPlus}
            subtitle="Manage your saved workouts"
        >
            <div className="mb-6">
                <Link
                    to="/workout-builder"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-700 hover:text-white text-white font-medium rounded-none transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Workout
                </Link>
            </div>
            <WorkoutList onStartWorkout={handleStartWorkout} />
        </PageWrapper>
    )
}

export default WorkoutsPage

