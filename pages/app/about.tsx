import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Confirm from '../../components/Confirm'
import LoadingPage from '../../components/LoadingPage'
import UserIcon from '../../components/UserIcon'
import { defaultUser, UserType } from '../../Types'

const About: NextPage = () => {
    const section = ''
    const header = 'text-3xl font-bold text-dark'
    const subheader = 'font-semibold text-xl mt-2'
    const info = ''

    const router = useRouter()

    const [userInfo, setUserInfo] = useState<UserType>(defaultUser)
    const [noUser, setNoUser] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)

    const [reporting, setReporting] = useState(false)

    useEffect(() => {
        async function getData() {
            const uid = localStorage.getItem('curUserID')
            if (uid) {
                const res = await axios.post('/api/GetCurrentUserInfo', { uid })
                setUserInfo(res.data)
            } else {
                setNoUser(true)
            }
            setLoadingPage(false)
        }
        getData()
    })

    function openInNewTab(url: string) {
        const w = window.open(url, '_blank')
        if (w) {
            w.focus()
        }
    }

    return (
        <div className='w-full h-screen overflow-auto scroll-smooth'>
            {loadingPage ? (
                <LoadingPage />
            ) : (
                <>
                    {reporting && (
                        <Confirm
                            cancel={() => setReporting(false)}
                            cancelMSG="I'll keep that in mind"
                            confirm={() =>
                                openInNewTab('https://github.com/gawlster/calcugrade/issues')
                            }
                            confirmMSG='Take me there'
                            message='You can report bugs through the issues panel on our Github'
                        />
                    )}
                    {noUser ? (
                        <div className='flex flex-row justify-end sticky top-7 pr-5'>
                            <div className='w-40 h-fit bg-white shadow-lg'>
                                <Button
                                    className='w-full'
                                    onClick={() => router.push('/auth/login')}
                                    opposite={true}>
                                    Log in
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-row justify-end sticky top-7 pr-5'>
                            <div className='w-60 h-fit bg-white shadow-lg'>
                                <Button
                                    className='w-full'
                                    onClick={() => router.push('/user/dashboard')}
                                    opposite={true}>
                                    Go to my dashboard
                                </Button>
                            </div>
                        </div>
                    )}
                    <div className='p-9 pb-16 flex flex-col gap-4'>
                        <div id='about' className=''>
                            <div className={header}>What is Calcugrade?</div>
                            <div className=''>
                                Calcugrade is an app developed by Connor Gawley which helps students
                                keep track of and prioritize their assignments and courses. The goal
                                of this app is to allow the user to see their current status in all
                                of their courses, including{' '}
                                <a
                                    className='text-mid hover:text-dark font-bold transition-colors'
                                    href='#grades'>
                                    three different measurements of grades.
                                </a>{' '}
                                It also provides the ability to sort and order upcoming tasks in a{' '}
                                <a
                                    className='text-mid hover:text-dark font-bold transition-colors'
                                    href='#sorting'>
                                    variety of sorting methods.
                                </a>
                            </div>
                        </div>
                        <div id='getting-started'>
                            <div className={header}>Getting started with Calcugrade</div>
                            <div>
                                To get started using Calcugrade and take back control of your school
                                life, add a course. When creating a course, there are three input
                                fields: school name, course code, and course name. The most
                                important being the course code, as this is displayed throughout the
                                app. Many students may find a system that works well for them in
                                terms of naming their course code, but we recommend giving the
                                official course code in all caps (ie. 'CSC 130'). Once you have a
                                course set up, you can start adding your assignments. We recommend
                                doing this at the beginning of your semester, so you only have to
                                come back to input grades as you complete assignments, rather than
                                input details for each assignment. Simply go through the syllabus at
                                the start of the term and input any assignments, quizes and tests.
                            </div>
                        </div>
                        <div id='completing'>
                            <div className={header}>Completing an assignment</div>
                            <div>
                                When completing an assignment, there are two ways to input your
                                grades. First, you can use the checkmark in the 'Upcoming tasks'
                                section. Second, you can use the edit icon within the course itself.
                                Both options take you to a form, where you can update any
                                information about the task.
                            </div>
                        </div>
                        <div id='grades'>
                            <div className={header}>Grade types</div>
                            <div>
                                As you use Calcugrade, you will soon realize that there are a
                                variety of grade types used to calculate your standing in a course.
                                <div>
                                    <div className={subheader}>Earned Grade</div>
                                    <div>
                                        Your earned grade, as the name suggests, is the grade you
                                        have currently earned in the course. The rationale behind
                                        this figure is as follows: if you were to get a 0 on every
                                        assignment remaining in the course, what would your final
                                        grade be? For example, if you have an assignment worth 10%
                                        of your final grade, which you earned 100% on, your earned
                                        grade for the course would be 10%.
                                    </div>
                                </div>
                                <div>
                                    <div className={subheader}>Expected Grade</div>
                                    <div>
                                        The expected grade works similarily to the Earned Grade,
                                        however this calculation takes into account any assignments
                                        which have expected grades. For example, like in the
                                        previous section suppose you have an assignment worth 10% of
                                        your final grade which you earned 100%. Lets suppose you
                                        have also submitted an assignment worth 5% of your final
                                        grade, and you estimate you will get 80%. Now, your earned
                                        grade will remain 10%, but your expected grade will sit at
                                        14%.
                                    </div>
                                </div>
                                <div>
                                    <div className={subheader}>On Track Grade</div>
                                    <div>
                                        The On Track Grade is arguably the most important one. This
                                        grade is calculated by ommitting every assignment that has
                                        not been completed, and adjusts the others accordingly. Lets
                                        go back to our previous example, where you have an
                                        assignment worth 10% with a 100% grade, and an assignment
                                        worth 5% with an estimated 80% grade. The on track grade
                                        will consider both of these assignments, and calculate your
                                        grade relative to the completed coursework. So, it would
                                        take the 10% that the first assignment was worth, and make
                                        it worth 67% of your On Track grade. Similarily it will
                                        transform the 5% your second assignment is worth to be worth
                                        33% of your On Track grade. Then, it calculates the grade
                                        you have earned from these new weights and adds them
                                        together. So from the first assignment, you have earned 67%
                                        of your on track grade (100% of 67%), and you expect to earn
                                        26.4% with your second assignment (80% of 33%). So, in this
                                        scenario, your On Track Grade will be 93.4%.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='sorting'>
                            <div className={header}>Sorting Methods</div>
                            <div>
                                The upcoming tasks section is a good place for you to keep track of
                                any assignments coming up soon. This list can be sorted in a variety
                                of ways to make it easier to prioritize which assignment to focus
                                on.
                                <div>
                                    <div className={subheader}>Sort by due date</div>
                                    <div>
                                        Sorting by due date is perhaps the most practical way to
                                        organize your assignments. This is a good option if your
                                        assignments are generally more spread out, and you like to
                                        work on the next thing that needs to be done first.
                                    </div>
                                </div>
                                <div>
                                    <div className={subheader}>Sort by percentage of final</div>
                                    <div>
                                        Sorting by the percentage of final can be useful, especially
                                        nearing the end of a semester. Usually school gets a bit
                                        hectic around this time, and it can be important to focus on
                                        what will have the most impact.
                                    </div>
                                </div>
                                <div>
                                    <div className={subheader}>Let us sort</div>
                                    <div>
                                        We have developed an algorithm which can help you prioritize
                                        your assignments throughout the semester. Our algorithm
                                        considers a variety of factors including due date,
                                        percentage of final, current grade in the course, etc. By
                                        considering all of these moving parts, we think we've
                                        cracked the code. Give it a try to see for yourself.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='issues'>
                            <div className={header}>Reporting issues</div>
                            <div className={info}>
                                If you stumble accross a bug or issue with our site, please{' '}
                                <div
                                    onClick={() => setReporting(true)}
                                    className='inline text-mid hover:text-dark font-bold transition-colors cursor-pointer'>
                                    report it
                                </div>{' '}
                                by creating an issue on our Github repo.
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default About
