import React from 'react'

export default function AboutComponent () {
    return (
        <div style={{ border: "1px dashed #7B61FF", padding: "44px 41px" }} className='flex flex-col gap-6 rounded-[5px] box-border '>
            <div className='font-[400] text-[16px] leading-[24px]'>
                We are a team of passionate and experienced chefs, cooks, stewards, and hospitality professionals who specialize in providing high-quality catering services for the maritime industry.<br></br>
                Our aim is to offer delectable meals and exceptional hospitality services that meet the unique needs of our clients, whether they are on luxury yachts, cargo ships, or offshore rigs.
            </div>
            <div className='font-[400] text-[16px] leading-[24px]'>
                As a company, we take pride in our commitment to excellence, and we work closely with each of our clients to tailor our services to their specific requirements.
            </div>

            <div className='font-[400] text-[16px] leading-[24px]'>
                We use only the freshest and highest-quality ingredients to prepare our dishes, ensuring that each meal is both flavorful and nutritious.We understand that catering in the maritime industry can be challenging,
                with limited space, resources, and time. However,  our team has extensive experience in this field and is well-equipped to handle any situation that comes our way.
            </div>

            <div className='font-[400] text-[16px] leading-[24px]'>
                Aside from our dedication to providing quality catering services, we also prioritize safety and environmental sustainability. We ensure that all our practices and processes align with relevant regulations and standards,
                and we take steps to minimize our environmental impact wherever possible. At MarineCatering, we believe that good food and hospitality are essential components of a productive and enjoyable marine journey.
                Whether you need a one-time event catering service or regular provisions for your vessel, we are here to provide the best possible experience for you and your crew.
            </div>
        </div>
    )
}
