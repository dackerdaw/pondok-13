import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import { Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem, Typography } from "@material-tailwind/react";

export default function HintsTimelineComponent({
  question,
}: {
  question: AssessmentItem
}) {

  const hints = question.hints

  return (
    <>
      <Timeline>
        {hints.map((hint, index) => {
          return (
            <TimelineItem key={index}>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography variant="h6" color="blue-gray" className="leading-none">
                  {`Langkah ke-${index}`}
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-600"
                >
                  {hint}
                </Typography>
              </TimelineBody>
            </TimelineItem>
          );
        })}
      </Timeline>
    </>
  );
};