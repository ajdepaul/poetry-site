'use sever'

import { H } from '@/app/components/ui/header'
import { Nav } from '@/app/components/ui/nav'
import { Sheet } from '@/app/components/ui/sheet'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export default async function PoemPage() {
  const year = new Date().getFullYear()
  const copyrightYear = year > 2024 ? `2024-${year}` : '2024'

  // TODO
  const isAdmin = true

  return (
    <>
      <Nav isAtHome={false} isAdmin={isAdmin} isAtAdminHome={false} />

      <H level="1" size="6xl" className="py-16 text-center">Legal</H>

      <Sheet className="leading-poem">
        <div className="sm:px-4">
          <P className="pt-3">
            Copyright © {copyrightYear} All rights reserved
          </P>
          <P>
            Legal Notices <br />
            This website uses the following third-party libraries:
          </P>

          <P>"Tailwind CSS" and "Heroicons" are licensed under the MIT License:</P>
          <MITLicense owner="Tailwind Labs, Inc." />

          <P>"Prisma" is licensed under the Apache-2.0 License:</P>
          <Apache20 />

          <P>"Class Variance Authority" is licensed under the Apache-2.0 License:</P>
          <Apache20 year="2022" owner="Joe Bell" />

          <P>"clsx" is licensed under the MIT License:</P>
          <MITLicense owner="Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)" />

          <P>"Next.js" and "es-lint-config-next" and licensed under the MIT License:</P>
          <MITLicense year="2024" owner="2024 Vercel, Inc." />

          <P>"React" and "react-dom" are licensed under the MIT License:</P>
          <MITLicense owner="Meta Platforms, Inc. and affiliates." />

          <P>"tailwind-merge" is licensed under the MIT License:</P>
          <MITLicense year="2021" owner="Dany Castillo" />

          <P>"Zod" is licensed under the MIT License:</P>
          <MITLicense year="2020" owner="Colin McDonnell" />

          <P>"Definitely Typed" is licensed under the MIT License:</P>
          <DefinitelyTypedLicense />

          <P>"ESLint" is licensed under the MIT License:</P>
          <MITLicense owner="OpenJS Foundation and other contributors, <www.openjsf.org>" />

          <P>"PostCSS" is licensed under the MIT License:</P>
          <MITLicense year="2013" owner="Andrey Sitnik <andrey@sitnik.ru>" />

          <P>"TypeScript" is licensed under the Apache-2.0 License:</P>
          <Apache20 />

          <P>"Marked" is licensed under the MIT License:</P>
          <MITLicense year="2018+" owner="MarkedJS (https://github.com/markedjs/)" />

          <P>"Markdown" is licensed under the following License:</P>
          <MarkdownLicense />
        </div>
      </Sheet >
    </>
  )
}

function MITLicense({ year = '[year]', owner = '[copyright holders]' }: { year?: string, owner?: string }) {
  return (
    <div className="pl-6">
      <P>MIT License</P>

      <P>Copyright (c) {year} {owner}</P>

      <P>
        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:
      </P>

      <P>
        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.
      </P>

      <P>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
      </P>
    </div>
  )
}

function Apache20({ year = '[yyyy]', owner = '[name of copyright owner]' }: { year?: string, owner?: string }) {
  return (
    <div className="pl-6">
      <P>
        Apache License<br />
        Version 2.0, January 2004<br />
        http://www.apache.org/licenses/
      </P>

      <P>TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION</P>

      <P>1. Definitions.</P>

      <P>
        "License" shall mean the terms and conditions for use, reproduction,
        and distribution as defined by Sections 1 through 9 of this document.
      </P>

      <P>
        "Licensor" shall mean the copyright owner or entity authorized by
        the copyright owner that is granting the License.
      </P>

      <P>
        "Legal Entity" shall mean the union of the acting entity and all
        other entities that control, are controlled by, or are under common
        control with that entity. For the purposes of this definition,
        "control" means (i) the power, direct or indirect, to cause the
        direction or management of such entity, whether by contract or
        otherwise, or (ii) ownership of fifty percent (50%) or more of the
        outstanding shares, or (iii) beneficial ownership of such entity.
      </P>

      <P>
        "You" (or "Your") shall mean an individual or Legal Entity
        exercising permissions granted by this License.
      </P>

      <P>
        "Source" form shall mean the preferred form for making modifications,
        including but not limited to software source code, documentation
        source, and configuration files.
      </P>

      <P>
        "Object" form shall mean any form resulting from mechanical
        transformation or translation of a Source form, including but
        not limited to compiled object code, generated documentation,
        and conversions to other media types.
      </P>

      <P>
        "Work" shall mean the work of authorship, whether in Source or
        Object form, made available under the License, as indicated by a
        copyright notice that is included in or attached to the work
        (an example is provided in the Appendix below).
      </P>

      <P>
        "Derivative Works" shall mean any work, whether in Source or Object
        form, that is based on (or derived from) the Work and for which the
        editorial revisions, annotations, elaborations, or other modifications
        represent, as a whole, an original work of authorship. For the purposes
        of this License, Derivative Works shall not include works that remain
        separable from, or merely link (or bind by name) to the interfaces of,
        the Work and Derivative Works thereof.
      </P>

      <P>
        "Contribution" shall mean any work of authorship, including
        the original version of the Work and any modifications or additions
        to that Work or Derivative Works thereof, that is intentionally
        submitted to Licensor for inclusion in the Work by the copyright owner
        or by an individual or Legal Entity authorized to submit on behalf of
        the copyright owner. For the purposes of this definition, "submitted"
        means any form of electronic, verbal, or written communication sent
        to the Licensor or its representatives, including but not limited to
        communication on electronic mailing lists, source code control systems,
        and issue tracking systems that are managed by, or on behalf of, the
        Licensor for the purpose of discussing and improving the Work, but
        excluding communication that is conspicuously marked or otherwise
        designated in writing by the copyright owner as "Not a Contribution."
      </P>

      <P>
        "Contributor" shall mean Licensor and any individual or Legal Entity
        on behalf of whom a Contribution has been received by Licensor and
        subsequently incorporated within the Work.
      </P>

      <P>
        2. Grant of Copyright License. Subject to the terms and conditions of
        this License, each Contributor hereby grants to You a perpetual,
        worldwide, non-exclusive, no-charge, royalty-free, irrevocable
        copyright license to reproduce, prepare Derivative Works of,
        publicly display, publicly perform, sublicense, and distribute the
        Work and such Derivative Works in Source or Object form.
      </P>

      <P>
        3. Grant of Patent License. Subject to the terms and conditions of
        this License, each Contributor hereby grants to You a perpetual,
        worldwide, non-exclusive, no-charge, royalty-free, irrevocable
        (except as stated in this section) patent license to make, have made,
        use, offer to sell, sell, import, and otherwise transfer the Work,
        where such license applies only to those patent claims licensable
        by such Contributor that are necessarily infringed by their
        Contribution(s) alone or by combination of their Contribution(s)
        with the Work to which such Contribution(s) was submitted. If You
        institute patent litigation against any entity (including a
        cross-claim or counterclaim in a lawsuit) alleging that the Work
        or a Contribution incorporated within the Work constitutes direct
        or contributory patent infringement, then any patent licenses
        granted to You under this License for that Work shall terminate
        as of the date such litigation is filed.
      </P>

      <P>
        4. Redistribution. You may reproduce and distribute copies of the
        Work or Derivative Works thereof in any medium, with or without
        modifications, and in Source or Object form, provided that You
        meet the following conditions:
      </P>

      <P>
        (a) You must give any other recipients of the Work or
        Derivative Works a copy of this License; and
      </P>

      <P>
        (b) You must cause any modified files to carry prominent notices
        stating that You changed the files; and
      </P>

      <P>
        (c) You must retain, in the Source form of any Derivative Works
        that You distribute, all copyright, patent, trademark, and
        attribution notices from the Source form of the Work,
        excluding those notices that do not pertain to any part of
        the Derivative Works; and
      </P>

      <P>
        (d) If the Work includes a "NOTICE" text file as part of its
        distribution, then any Derivative Works that You distribute must
        include a readable copy of the attribution notices contained
        within such NOTICE file, excluding those notices that do not
        pertain to any part of the Derivative Works, in at least one
        of the following places: within a NOTICE text file distributed
        as part of the Derivative Works; within the Source form or
        documentation, if provided along with the Derivative Works; or,
        within a display generated by the Derivative Works, if and
        wherever such third-party notices normally appear. The contents
        of the NOTICE file are for informational purposes only and
        do not modify the License. You may add Your own attribution
        notices within Derivative Works that You distribute, alongside
        or as an addendum to the NOTICE text from the Work, provided
        that such additional attribution notices cannot be construed
        as modifying the License.
      </P>

      <P>
        You may add Your own copyright statement to Your modifications and
        may provide additional or different license terms and conditions
        for use, reproduction, or distribution of Your modifications, or
        for any such Derivative Works as a whole, provided Your use,
        reproduction, and distribution of the Work otherwise complies with
        the conditions stated in this License.
      </P>

      <P>
        5. Submission of Contributions. Unless You explicitly state otherwise,
        any Contribution intentionally submitted for inclusion in the Work
        by You to the Licensor shall be under the terms and conditions of
        this License, without any additional terms or conditions.
        Notwithstanding the above, nothing herein shall supersede or modify
        the terms of any separate license agreement you may have executed
        with Licensor regarding such Contributions.
      </P>

      <P>
        6. Trademarks. This License does not grant permission to use the trade
        names, trademarks, service marks, or product names of the Licensor,
        except as required for reasonable and customary use in describing the
        origin of the Work and reproducing the content of the NOTICE file.
      </P>

      <P>
        7. Disclaimer of Warranty. Unless required by applicable law or
        agreed to in writing, Licensor provides the Work (and each
        Contributor provides its Contributions) on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
        implied, including, without limitation, any warranties or conditions
        of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
        PARTICULAR PURPOSE. You are solely responsible for determining the
        appropriateness of using or redistributing the Work and assume any
        risks associated with Your exercise of permissions under this License.
      </P>

      <P>
        8. Limitation of Liability. In no event and under no legal theory,
        whether in tort (including negligence), contract, or otherwise,
        unless required by applicable law (such as deliberate and grossly
        negligent acts) or agreed to in writing, shall any Contributor be
        liable to You for damages, including any direct, indirect, special,
        incidental, or consequential damages of any character arising as a
        result of this License or out of the use or inability to use the
        Work (including but not limited to damages for loss of goodwill,
        work stoppage, computer failure or malfunction, or any and all
        other commercial damages or losses), even if such Contributor
        has been advised of the possibility of such damages.
      </P>

      <P>
        9. Accepting Warranty or Additional Liability. While redistributing
        the Work or Derivative Works thereof, You may choose to offer,
        and charge a fee for, acceptance of support, warranty, indemnity,
        or other liability obligations and/or rights consistent with this
        License. However, in accepting such obligations, You may act only
        on Your own behalf and on Your sole responsibility, not on behalf
        of any other Contributor, and only if You agree to indemnify,
        defend, and hold each Contributor harmless for any liability
        incurred by, or claims asserted against, such Contributor by reason
        of your accepting any such warranty or additional liability.
      </P>

      <P>END OF TERMS AND CONDITIONS</P>

      <P>APPENDIX: How to apply the Apache License to your work.</P>

      <P>
        To apply the Apache License to your work, attach the following
        boilerplate notice, with the fields enclosed by brackets "[]"
        replaced with your own identifying information. (Don't include
        the brackets!)  The text should be enclosed in the appropriate
        comment syntax for the file format. We also recommend that a
        file or class name and description of purpose be included on the
        same "printed page" as the copyright notice for easier
        identification within third-party archives.
      </P>

      <P>Copyright {year} {owner}</P>

      <P>
        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
      </P>

      <P>http://www.apache.org/licenses/LICENSE-2.0</P>

      <P>
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
      </P>
    </div>
  )
}

function DefinitelyTypedLicense() {
  return (
    <div className="pl-6">
      <P>
        This project is licensed under the MIT license.
      </P>

      <P>
        Copyrights are respective of each contributor listed at the beginning of each definition file.
      </P>

      <P>
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      </P>

      <P>
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
      </P>

      <P>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </P>
    </div>
  )
}

function MarkdownLicense() {
  return (
    <div className="pl-6">
      <P>
        Copyright © 2004, John Gruber http://daringfireball.net/ All rights reserved.
      </P>

      <P>
        Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
      </P>

      <P>
        • Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
      </P>

      <P>
        • Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
      </P>

      <P>
        • Neither the name “Markdown” nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
      </P>

      <P>
        This software is provided by the copyright holders and contributors “as is” and any express or implied warranties, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose are disclaimed. In no event shall the copyright owner or contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, procurement of substitute goods or services; loss of use, data, or profits; or business interruption) however caused and on any theory of liability, whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of the use of this software, even if advised of the possibility of such damage.
      </P>
    </div>
  )
}

function P({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <p className={twMerge('leading-poem-1/2 pb-6', className)} {...props} />
  )
}
