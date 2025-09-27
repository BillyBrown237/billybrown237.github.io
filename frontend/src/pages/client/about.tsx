import {Container} from "@/components/container.tsx";
import {Tag} from "@/components/tag.tsx";

export const About = () => {
    return (
        <Container className="bg-gray-50 text-center" id="about">
            <div className="self-center">
                <Tag label="About me"/>
            </div>
            <div className="flex w-full flex-col justify-between gap-12 md:flex-row">
                {/* Image */}
                <div className="flex justify-center md:order-first md:justify-end">
                    <div className="relative h-[380px] w-[320px] md:h-[460px] md:w-[380px] lg:h-[520px] lg:w-[440px]">
                        {/*<Image*/}
                        {/*    src={SagarFullPose}*/}
                        {/*    alt="Fullpose of Sagar"*/}
                        {/*    className="absolute z-10 h-[360px] w-[280px] border-8 border-gray-50 max-md:left-5 md:right-0 md:top-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"*/}
                        {/*    style={{ objectFit: 'cover' }}*/}
                        {/*></Image>*/}
                        <div
                            className="absolute h-[360px] w-[320px] border-8 border-transparent bg-gray-200 max-md:top-5 md:bottom-0 md:left-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"></div>
                    </div>
                </div>
                {/* Content */}
                <div className="flex max-w-xl flex-col gap-6">
                    <h3>
                        Curious about me? Here you have it:
                    </h3>
                    <p>
                        I&apos;m a passionate person,
                        who specializes in full stack development (React.js & Node.js). I am
                        enthusiastic about bringing the technical and visual aspects of
                        digital products to life. User experience, pixel perfect design, and
                        writing clear, readable, highly performant code matters to me.
                    </p>
                    <p>
                        I began my journey as a web developer in 2015, and since then,
                        I&apos;ve continued to grow and evolve as a developer, taking on new
                        challenges and learning the latest technologies along the way. Now,
                        in my early thirties, 7 years after starting my web development
                        journey, I&apos;m building cutting-edge web applications using
                        modern technologies such as Next.js, TypeScript, Nestjs,
                        Tailwindcss, Supabase and much more.
                    </p>
                    <p>
                        I am very much a progressive thinker and enjoy working on products
                        end to end, from ideation all the way to development.
                    </p>

                    <p>Finally, some quick bits about me.</p>
                    <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                        <ul className="flex list-inside list-disc flex-col gap-2">
                            <li>
                                B.sc in Computer Science
                            </li>
                            <li>Full time freelancer</li>
                        </ul>
                        <ul className="flex list-inside list-disc flex-col gap-2">
                            <p>Avid learner</p>
                            <p>Aspiring indie hacker</p>
                        </ul>
                    </div>
                    <p>
                        One last thing, I&apos;m available for freelance work, so feel free
                        to reach out and say hello! I promise I don&apos;t bite 😉
                    </p>
                </div>
            </div>

        </Container>
    )
}