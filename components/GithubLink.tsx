import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const GithubLink: React.FC<{}> = () => {
    return (
        <div className='w-fit absolute bottom-4 right-1/2 left-1/2'>
            <a
                className='flex gap-1 font-bold items-center justify-center'
                href='https://github.com/gawlster/calcugrade'
                target='_blank'>
                Github <FontAwesomeIcon icon={faGithub} />
            </a>
        </div>
    )
}

export default GithubLink
