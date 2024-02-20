import * as React from 'react'
import { PathMorpher } from './_Morphers'

const IconObjectGear: React.FC<
  React.SVGProps<SVGSVGElement> & { animated: boolean }
> = ({ animated, ...rest }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <PathMorpher
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 3.7507c0-.4142.3358-.75.75-.75l2.5 0c.4142 0 .75.3358.75.75l0 .9806c0 .3318.2197.6203.5291.7403.6771.2625 1.3032.6272 1.8594 1.0753.2583.2081.6179.254.9052.0881l.851-.4913c.3587-.2071.8174-.0842 1.0245.2745l1.25 2.1651c.2072.3587.0842.8174-.2745 1.0245l-.85.4908c-.2871.1657-.4272.4997-.3767.8273.054.3504.082.7093.082 1.0748 0 .3655-.028.7245-.082 1.0749-.0505.3276.0896.6616.3767.8273l.85.4908c.3587.2071.4816.6658.2745 1.0245l-1.25 2.1651c-.2071.3587-.6658.4816-1.0245.2745l-.851-.4913c-.2873-.1659-.6469-.12-.9052.0881-.5562.4481-1.1823.8128-1.8594 1.0753-.3094.1199-.5291.4084-.5291.7403l0 .9805c0 .4142-.3358.75-.75.75l-2.5 0c-.4142 0-.75-.3358-.75-.75l0-.9805c0-.3319-.2197-.6204-.5291-.7403-.6771-.2625-1.3032-.6272-1.8594-1.0753-.2583-.2081-.6179-.254-.9052-.0881l-.851.4913c-.3587.2071-.8174.0842-1.0245-.2745l-1.25-2.1651c-.2071-.3587-.0842-.8174.2745-1.0245l.8501-.4908c.2871-.1657.4271-.4997.3766-.8273-.054-.3504-.082-.7094-.082-1.0749 0-.3655.028-.7244.082-1.0748.0505-.3276-.0896-.6616-.3766-.8273l-.8501-.4908c-.3587-.2071-.4816-.6658-.2745-1.0245l1.25-2.1651c.2071-.3587.6658-.4816 1.0245-.2745l.851.4913c.2873.1659.6469.12.9052-.0881.5562-.4481 1.1823-.8129 1.8594-1.0753.3094-.1199.5291-.4084.5291-.7403l0-.9806zM14 12c0 1.1046-.8954 2-2 2-1.1046 0-2-.8954-2-2 0-1.1046.8954-2 2-2 1.1046 0 2 .8954 2 2z"
        dAnimated="M3.288 10.4342c-.866-.5-1.1118-1.4174-.6977-2.1348l1.5-2.5981c.4142-.7174 1.3316-.9632 2.049-.5491l.9369.5409c.5913-.4615 1.2402-.833 1.9244-1.1093 0 0 0 0 0 0 0 0 0 0 0 0l-0-1.0834c-.0001-.8284.6716-1.5 1.4999-1.5l3-0c.8284-.0001 1.5.6716 1.5 1.4999l-.0001 1.0829c.34.138.6741.3008 1 .4889.326.1882.6339.3962.9234.6216 0 0 0 0 0 0 0 0 0 0 0 0l.9379-.5414c.7174-.4142 1.6348-.1685 2.049.5491l1.5 2.5981c.4142.7174.1684 1.6348-.5491 2.049l-.9383.5417c.1028.7307.1054 1.4783.0014 2.2212 0 0 0 0 0 0 0 0 0 0 0 0l.9369.5409c.7175.4142.9632 1.3316.5491 2.049l-1.5 2.5981c-.4142.7174-1.3315.9633-2.049.5491l-.9369-.5409c-.5913.4615-1.2401.8332-1.9243 1.1094 0 0 0 0 0 0 0 0 0 0 0 0l0 1.0834c-0 .8285-.6716 1.5001-1.5 1.5001l-3 0c-.8284-0-1.5-.6716-1.4999-1.5l-.0001-1.0829c-.34-.1379-.674-.3007-1-.4889-.3259-.1881-.634-.3961-.9234-.6216 0 0 0 0 0 0 0 0 0 0 0 0l-.9378.5414c-.7175.4142-1.6348.1685-2.049-.549l-1.5-2.5981c-.4142-.7174-.1685-1.6348.5491-2.0491l.9383-.5417c-.1029-.7306-.1054-1.4784-.0015-2.2212 0 0 0 0 0 0 0 0 0 0 0 0l-.9369-.5409zm5.2492-.4335c1.1045-1.9132 3.5509-2.5687 5.4641-1.4641 1.9132 1.1045 2.5686 3.551 1.4641 5.4641-1.1046 1.9132-3.551 2.5686-5.4641 1.4641-1.9132-1.1046-2.5687-3.5509-1.4641-5.4641z"
        fill="#1B1E2E"
        animated={animated}
        className="icon-light"
      />
      <circle cx="12" cy="12" r="2" fill="#9095AD" className="icon-dark" />
    </svg>
  )
}

export default IconObjectGear
