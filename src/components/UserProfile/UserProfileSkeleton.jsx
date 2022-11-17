import { Skeleton } from "@mui/material"
import { Stack } from "@mui/system"
import styles from './userProfile.module.scss';


export const UserProfileSkeleton = () => {

    return (
        <div>
            <Stack spacing={1} className={styles.profileSkelet}>
                <div className={styles.profileSkeletContent}>
                    <Skeleton
                        variant="circular"
                        width={120}
                        height={120}
                        style={{ borderRadius: 12 }}
                        className={styles.profileAvatarSkelet}
                    />
                    <div>
                        
                        <Skeleton variant="text" width={100} height={50} />
                    </div>
                </div>

            </Stack>
        </div>
    )
}