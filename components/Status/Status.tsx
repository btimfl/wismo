import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import styles from "./Status.module.scss"
import OrderSteps from "./OrderSteps"
import Link from "next/link"
import { TimeIcon } from "@chakra-ui/icons"
import ShipmentStatus from "../ShipmentStatus/ShipmentStatus"

interface TrackingStatusProps {
    statusHeading: string;
    statusSubheading: string | any;
    currentStep: number;
    lastUpdated: string;
    trackingUpdates: any[]
}

export default function Status(props: TrackingStatusProps) {
    const stepData = useSteps({
        initialStep: props.currentStep,
    })
    
    return (
        <Box className={styles.container} p={4}>
            <Box textAlign="center">
                <Text as="h1" fontSize="xl">{props.statusHeading}</Text>
                <Text as="p" fontSize="sm" className={styles.lightText} dangerouslySetInnerHTML={{__html: props.statusSubheading}}></Text>
            </Box>
            <OrderSteps {...stepData} />
            <Flex justifyContent="space-between" w="100%" pt={4}>
                <HStack className={styles.lightText}>
                    <TimeIcon verticalAlign="middle" fontSize={`xs`}/>
                    <Text as="span" fontSize="xs">{`${new Date(props.lastUpdated).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })} at ${new Date(props.lastUpdated).toLocaleTimeString('en-us', {hour: '2-digit', minute:'2-digit'})}`}</Text>
                </HStack>
                <ShipmentStatus trackingUpdates={props.trackingUpdates} />
            </Flex>
        </Box>
    )
}