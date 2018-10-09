As you may or may not know, the remark plugin & GraphQl fails all queries when there is no default post
being loaded. A Gatsby site with no markdown will spit out errors due to queries trying to pull fields
that do not exist in the GraphQl schema. The GrapQl schema is built by reading the markdown files to
put it better so we need some dummy content that covers and helps create the schema to cover all our
queries within Qards.

These pages here will not be linked from anywhere and the results from here should always be filtered
out.