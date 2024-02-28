export default function Site({raw}) {
    return (
        <>
        <div dangerouslySetInnerHTML={{ __html: raw }}></div>
        </>
    )
}