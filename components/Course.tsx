import React, { useState } from 'react'
import { AssignmentType } from '../Types'
import Assignment from './Assignment'
import CreateAssignmentForm from './CreateAssignmentForm'

const Course: React.FC<{
    courseID: string
    courseCode: string
    earnedGrade: string
    estimatedGrade: string
    onTrackGrade: string
    assignments: AssignmentType[]
    _update: () => void
}> = ({
    courseID,
    courseCode,
    earnedGrade,
    estimatedGrade,
    onTrackGrade,
    assignments,
    _update,
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [creatingAssignment, setCreatingAssignment] = useState<boolean>(false)

    const gradeCardStyles = 'flex flex-col items-center justify-center border p-1'

    return (
        <div>
            {creatingAssignment ? (
                <CreateAssignmentForm
                    cid={courseID}
                    _close={() => setCreatingAssignment(false)}
                    _update={() => _update()}
                />
            ) : (
                <div className='w-full h-fit max-h-[30rem] overflow-auto px-4 py-2 border flex flex-col gap-1'>
                    <div
                        className='flex flex-row justify-between items-center cursor-pointer'
                        onClick={() => setOpen(!open)}>
                        <div className='text-xl font-bold'>{courseCode}</div>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <div className={gradeCardStyles}>
                                <div className='text-lg font-semibold'>
                                    {Math.round(Number(earnedGrade) * 10) / 10}%
                                </div>
                                <div className='text-sm italic'>EARNED</div>
                            </div>
                            <div className={gradeCardStyles}>
                                <div className='text-lg font-semibold'>
                                    {Math.round(Number(estimatedGrade) * 10) / 10}%
                                </div>
                                <div className='text-sm italic'>ESTIMATED</div>
                            </div>
                            <div className={gradeCardStyles}>
                                <div className='text-lg font-semibold'>
                                    {Math.round(Number(onTrackGrade) * 10) / 10}%
                                </div>
                                <div className='text-sm italic'>ON TRACK</div>
                            </div>
                        </div>
                    </div>
                    {open && (
                        <div className='p-2'>
                            {assignments.length === 0 ? (
                                <div className='text-center'>
                                    No assignments to show.{' '}
                                    <div
                                        className='inline cursor-pointer'
                                        onClick={() => setCreatingAssignment(true)}>
                                        Add some now?
                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-5'>
                                    {assignments.map((assignment) => {
                                        return (
                                            <Assignment
                                                key={assignment._id}
                                                assignment={assignment}
                                            />
                                        )
                                    })}
                                    <div
                                        className='text-center cursor-pointer'
                                        onClick={() => setCreatingAssignment(true)}>
                                        Add an assignment
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Course
