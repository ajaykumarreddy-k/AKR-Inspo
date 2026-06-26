export default function Features() {
  const features = [
    {
      id: "#1",
      tag: "CONNECT",
      title: "LIVES EVERYWHERE",
      description: "TELEGRAM, DISCORD, SLACK, WHATSAPP, SIGNAL, EMAIL, CLI — AND A GROWING LIST OF PLATFORMS. ONE AGENT, ONE MEMORY, EVERY SURFACE.",
      img: "https://lh3.googleusercontent.com/aida/AP1WRLu-rXk2TZgNuNVDZiT3ewaIbX6W2H8VsMVKyNQO0oVJ7iNlZL1IZLAb51etXZnOnZ_C78WHiWyAEHf218_T4iW1nlV1SI07Af7HDn_QBkUsz6bR6DoHaMh-aNospoMsdK9mqTHHpiJoFO2cHXNR_6zVzd8neDmjKg8rZb91xyiG9o97mGH456EURXbiJuR_wbNSiYudDmXkQC_bNK7D-W-jmLEHj0bGHCsDpg6zPcdztCu5i6h3I1z8yic"
    },
    {
      id: "#2",
      tag: "REMEMBER",
      title: "PERSISTENT MEMORY",
      description: "IT LEARNS YOUR PROJECTS, AUTO-GENERATES SKILLS, AND NEVER FORGETS HOW IT SOLVED A PROBLEM.",
      img: "https://lh3.googleusercontent.com/aida/AP1WRLtWhKvrSo-s7hzqqxpjF-cG9WT52_KddnXlu64sG4dtrIf5QULEKgs0Ml8cU_h347h1l7nrYXpOnfO25CWad29aq2TiW5PilNUqG7fKAZ148mfEM5j8IZwb5GHG1iBaSombFpmV0teBBG6EpNHI-jz4xuuuVSEOeRjeoLAYDWwPHUgJTmAkUbnM6qiYdzWliL-8hjLT1MngmfkPkM9pdeIOpGFoTcnwR3PBjHCBpWbWAxZ7pGpuLbihfSw"
    },
    {
      id: "#3",
      tag: "SCHEDULE",
      title: "FOCUSED AUTOMATION",
      description: "NATURAL-LANGUAGE SCHEDULING FOR REPORTS, BACKUPS, AND BRIEFINGS — RUNNING UNATTENDED THROUGH THE GATEWAY, FOCUSED EVERY TIME.",
      img: "https://lh3.googleusercontent.com/aida/AP1WRLsj-8i-45LNkAgxtpfxcVgVTJ0XlPtH9255nFAoSiD1qA76KMQ8ymlKM9Afye2-K0SbtvKxLy2D990pU7sifa8CvJc6nDdJXGZJ5cKfYgQZm5piQ-kdVNCfJzZ6rzuNmwnmIBzH9F4UWC_20rgRz5pL8Otj56eQSdUeKH24OfeP0Pcmm-y1JQitWyMnMp0kyuIxahO59hAf-WzGeeKSSByj6zw1-woOII6oLE0uTldW72GPY15WBvBICxA"
    },
    {
      id: "#4",
      tag: "DELEGATE",
      title: "TASKS MULTIPLIED",
      description: "ISOLATED SUBAGENTS WITH THEIR OWN CONVERSATIONS, TERMINALS, AND PYTHON RPC SCRIPTS FOR ZERO-CONTEXT-COST PIPELINES.",
      img: "https://lh3.googleusercontent.com/aida/AP1WRLvH9yKhLkXXMc3r37ufIxYVRFBa-7KT7HZerDL__Bji1gU92nSKFmacO-lbhjzGgt-R7cnavk69aOmRuu9oCxQq_77iaW1dxkd4KtCwDs-Jy1_msg_fKEpZ0gYeYFZ6sSnbw539BQAK4h_YkA8dX_pPxT-1uZN4JOdlwmeUtdpvbX5IsBAazK70dbS8mwdtz1bLDZKBJ510vq_I_s-xKHeHOwjrPR70DQErbAoQrD8GFIp44PhZWCHN_UI"
    },
    {
      id: "#5",
      tag: "SEARCH",
      title: "BROWSE THE WEB",
      description: "WEB SEARCH, BROWSER AUTOMATION, VISION, IMAGE GENERATION, TEXT-TO-SPEECH, AND MULTI-MODEL REASONING.",
      img: "https://lh3.googleusercontent.com/aida/AP1WRLuwpTne0V5_BQXxvBQbCjqFcjy7qwYCcYQUwnmx2XamNE210D5-uOIbGkh1VfYM8GiM_DN9b6abaTPAVN_Oai-TZmVbWrecEYYoVr3Ad5-qatJsifADWWyNHMXVGdny93j2CT5yjy5O-VVMmm1u1A7VWPeTvBSv0Xvo9WeF2VkrxbMj7GayYv6qv1Z6XYTJeugYk7-lvCriEB1dIWzZ07lpMJA7ofDwhsR7ghxHJQ0heH6dNRhvXl811sM"
    },
    {
      id: "#6",
      tag: "EXPERIMENT",
      title: "ISOLATED SANDBOXING",
      description: "FIVE BACKENDS — LOCAL, DOCKER, SSH, SINGULARITY, MODAL — WITH CONTAINER HARDENING AND NAMESPACE ISOLATION.",
      img: "https://lh3.googleusercontent.com/aida/AP1WRLsCIrwCAAvM-yYb5-vqFh5CQ-RIbjmDKm-MOT5oKlWoJmETRI6oZVg5xHfUCzWrgZNgkwJIA_dsQLlPW2nAxjue5DpPQYN1wyb-0qrNVBWaxWqMnStBSb7oHiP3c_8sYRGz1OmkxJmRRkM_k0NNDNH8ydzFeyoepkgoA3H8QggZ6DoxIdEIwTfZG7nj2UtgapwHjoDhm89MXLfGZDDclx0mnjVzMT0AxTraKUIXI_IJs4hws2gY3tJr3eg"
    }
  ];

  return (
    <section className="bg-brand-blue p-[37px]" id="features">
      <div className="bg-white text-brand-blue px-6 py-12 md:px-12 md:py-24 w-full relative">
        {/* Toggle at top right */}
        <div className="flex justify-end mb-16">
          <div className="flex border border-brand-blue text-[9px] font-mono font-bold uppercase tracking-[0.15em]">
            <span className="px-5 py-2.5 bg-brand-blue text-white">Feature</span>
            <span className="px-5 py-2.5 text-brand-blue">Preview</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {features.map((feature, i) => (
            <article key={i} className="flex flex-col space-y-8 group relative">
              <div className="flex items-start flex-1 min-h-[9rem] md:min-h-[11rem]">
                {i === 0 && (
                  <img 
                    alt="Badge Logo" 
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover shrink-0 rounded-lg mr-4 mt-8" 
                    src="https://lh3.googleusercontent.com/aida/AP1WRLtI-knmSbDga_TR0P10EnX0jl3B9BVnUjSiWPDZbx7vmaideMfsB0LCtHhxf1RNi8DgG8IdxhetjSy3E5_rNd3ySdgoVg1wC15EnhEVzZ5tpGCCJQC03R8WQx-JxZTWMqqfNAqfcgVefPgjUH3ZLYW4SM0vccnvcxUS4NTdtqXYIj7F_Q4v1op--_iHUxfbSWjwUkTxTxMvas7-2Wh50CCqIDIO3ix55FRmAFGn9LawHQiVuY3Odzkv010" 
                  />
                )}
                <div className="space-y-4 pt-1">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] font-bold opacity-80">{feature.id} {feature.tag}</p>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[0.95]">
                    {feature.title.split(' ').map((w, j) => <div key={j}>{w}</div>)}
                  </h2>
                </div>
              </div>
              
              <div className="aspect-square overflow-hidden relative">
                <img alt={`${feature.title} Art`} className="w-full h-full object-cover" src={feature.img} />
              </div>
              
              <p className="text-[11px] leading-[2] font-mono uppercase tracking-[0.1em] text-brand-blue">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
