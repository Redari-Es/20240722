"use client"
import { footerLinks } from '@/constant'
import Image from 'next/image'
import Link from 'next/link';


type ColumnProps = {
    title: string;
    links: Array<string>
}
const FooterColumn = ({ title, links }: ColumnProps) => {
    return (
        <div className='footer_column'>
            <h2 className='mt-8 text-base leading-6 text-gray-900 font-semibold' > {title}</h2 >
            <ul className='flex flex-col text-sm font-normal text-nowrap text-gray-600'>
                {links.map((link) =>
                    <Link href="/" key={link}
                        className='mt-6 p-0 space-y-2'
                    >{link}</Link>
                )}
            </ul>
        </div >
    )
}

const Footer = () => (
    <footer className='flex bg-white'>
        <h2 id="footer-heading" className='sr-only'>Footer</h2>
        {/* footer-content */}
        <div className='
            mx-auto max-w-8xl px-6 pb-8 mt-8 sm:mt-12 lg:mt-16 border-t border-gray-900/10 pt-16 
                    flex xl:flex-col gap-20 w-full'>
            {/* icon */}
            <div className='xl:grid xl:grid-cols-3 sm:gap-8 xl:gap-8'>
                <div className='space-y-8'>
                    <Image
                        src="/favicon.ico"
                        width={64}
                        height={64}
                        alt='PDF.ai logo' />
                    <p className='leading-6 text-gray-600 text-sm'>
                        Chat with any PDF: ask questions, get summaries, find information, and more.
                    </p>
                    <div className='flex space-x-6'>
                        {/* Titok */}
                        <Link href="https://www.tiktok.com/@pdfai"
                            className='text-gray-400 hover:text-gray-500'
                            target='_blank'
                        >
                            <span className='sr-only'>TikTok</span>
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2859 3333" fill-rule="evenodd" clip-rule="evenodd" className="h-6 w-6" aria-hidden="true" style={{ width: '20px' }}><path d="M2081 0c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753-356-583-138-1606 1004-1647v561c-87 14-180 36-265 65-254 86-398 247-358 531 77 544 1075 705 992-358V1h551z"></path></svg>
                        </Link>
                        {/* Ins */}
                        <Link href="https://www.instagram.com/pdfdotdotai"
                            className='text-gray-400 hover:text-gray-500'
                            target='_blank'
                        >
                            <span className='sr-only'>Instagram</span>
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path></svg>
                        </Link>
                        {/* X/Twitter */}
                        <Link href="https://www.twitter.com/pdfdotai"
                            className='text-gray-400 hover:text-gray-500'
                            target='_blank'
                        >
                            <span className='sr-only'>Twitter</span>
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                        </Link>
                        {/* Youtube */}
                        <Link href="https://www.youtube.com/@pdfai"
                            className='text-gray-400 hover:text-gray-500'
                            target='_blank'
                        >
                            <span className='sr-only'>Youtube</span>
                            <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
                {/* footerLinks */}
                <div className='mt-16 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0'>
                    <div className='md:grid md:grid-cols-3 md:gap-8 pb-6'>
                        <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links} />
                        <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links} />
                        <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links} />
                    </div>
                </div>
            </div>
        </div>
    </footer >
)

export default Footer