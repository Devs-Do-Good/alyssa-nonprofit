import React from "react"
import styled from "styled-components"

export function DonateForm({ data }) {
    return (
        <WidgetWrapper>
            <script src="https://donorbox.org/widget.js" paypalExpress="false"></script>
            <FrameWrapper>
                <iframe 
                    src={`${data.donationLink}?default_interval=o&hide_donation_meter=${data.hideDonationMeter}`}
                    name="donorbox"
                    allowpaymentrequest=""
                    seamless="seamless"
                    width="100%"
                    frameborder="0"
                    scrolling="no"
                    height="900px"
                    style={{ maxHeight: 'none !important', display: 'block', margin: 'auto' }}>
                </iframe>
            </FrameWrapper>
        </WidgetWrapper>
    )
}

const FrameWrapper = styled.div`
    display: block;
    margin: auto;
    width: 60%;

    @media (max-width: 768px) {
        width: 80%;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
    height: auto;
`

const WidgetWrapper = styled.div`
    padding-top: 10%;
    max-width: 100vw;
    height: auto;
`

export const DonateFormBlock = {
    label: "Donate Form",
    key: "donate",
    name: "donateForm",
    component: "group",
    defaultItem: {
        hideDonationMeter: true,
    },
    fields: [
        {
            name: "hideDonationMeter",
            label: "Hide Donation Meter",
            component: "toggle",
        },
        {
            name: "donationLink",
            label: "Link to Donorbox Campaign Embed",
            component: "text",
        }
    ],
}