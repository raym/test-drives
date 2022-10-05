import * as dotenv from 'dotenv'

dotenv.config()

export const getSpaceName = () => process.env.SPACES_SPACE_NAME

